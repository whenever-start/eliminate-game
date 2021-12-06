<!--
 * @Description: 游戏主要部分
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:00:00
 * @LastEditTime: 2021-11-20 00:20:26
-->

<template>
  <div class="game" ref="game"></div>
</template>
<script>
import {
  base,
  eliminateSources,
  matchSources,
  clickSource,
  dropSource,
  swapSource
} from '../config'
import { Block } from 'assets/js/class'
import { wait } from 'assets/js/utils'
import _ from 'lodash'

export default {
  name: 'Game',
  data() {
    return {
      elsBlocks: [],
      prevBlock: null,
      // 消除次数
      eliminateTimes: -1,
      delay: 300,
      step: 0,
      task: _.cloneDeep(this.config.task)
    }
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.initGame(this.config)
  },
  methods: {
    initGame(config) {
      this.initStyle(config)
      this.initBlocks(config)
      this.initCompares()
    },

    initData() {
      this.step = this.config.step
      this.$nextTick(() => {
        this.task = [..._.cloneDeep(this.config.task)]
      })
    },

    restartGame() {
      this.initData()
      this.initCompares()
    },

    nextGame() {
      this.$refs.game.innerHTML = ''
      this.initData()
      this.$nextTick(() => {
        this.initGame(this.config)
      })
    },

    initCompares() {
      this.elsBlocks.forEach((col) => {
        col.forEach((elBlock) => {
          elBlock.setCompare()
          while (this.canMatch(elBlock)) {
            elBlock.setCompare()
          }
        })
      })
    },

    initBlocks(config) {
      for (let x = 0; x < config.lenX; x++) {
        this.elsBlocks[x] = []
        for (let y = 0; y < config.lenY; y++) {
          const el = this.createBlock(x, y)
          this.elsBlocks[x].push(el)
        }
      }
    },

    createBlock(x, y) {
      const el = new Block(x, y).elBlock
      let self = this

      el.onclick = function () {
        self.click(el)
      }

      this.$refs.game.appendChild(el)
      return el
    },

    initStyle(config) {
      this.$refs.game.style.width =
        config.lenX * (2 * base.gap + base.size) - base.gap + 'px'
      this.$refs.game.style.height =
        config.lenY * (2 * base.gap + base.size) - base.gap + 'px'
    },

    async click(elBlock) {
      const clickSound = new Audio(clickSource)

      if (this.prevBlock) {
        // prev 存在
        if (this.isClosed(this.prevBlock, elBlock)) {
          // 相邻
          this.swap(this.prevBlock, elBlock)
          let matches2 = this.canMatch(elBlock)
          let matches1 = this.canMatch(this.prevBlock)
          let bothMatch = this.multiCanMatch(elBlock, this.prevBlock)

          if (!matches1 && !matches2) {
            await wait(this.delay)
            this.swap(elBlock, this.prevBlock)
          } else if (matches1 && matches2) {
            this.eliminate(bothMatch)
          } else if (matches1) {
            this.eliminate(matches1)
          } else if (matches2) {
            this.eliminate(matches2)
          }

          // step
          if (matches1 || matches2) {
            this.updateStep()
          }

          this.toggleActive(null, this.prevBlock)
        } else {
          // 不相邻
          clickSound.play()
          if (this.prevBlock === elBlock) {
            // 同一个
            this.toggleActive(null, this.prevBlock)
          } else {
            // 不相邻 + 不同一个
            this.toggleActive(elBlock, this.prevBlock, elBlock)
          }
        }
      } else {
        // prev 不存在
        clickSound.play()
        this.toggleActive(elBlock, elBlock)
      }
    },

    /**
     * @description: 消除匹配的元素，掉落、再匹配再消除
     * @param {Array} matches 匹配元素的数组
     * @return {*}
     */
    async eliminate(match) {
      const dropSound = new Audio(dropSource)
      const fillElements = {} // 补充方块的 x(列) 集合
      const xSet = {} // x(列)集合

      // eliminate 音效
      this.eliminateTimes++

      let eliminateSrc =
        this.eliminateTimes < eliminateSources.length - 1
          ? this.eliminateTimes
          : eliminateSources.length - 1

      const eliminateSound = new Audio(eliminateSources[eliminateSrc])

      // 消除期间禁止点击,消除结束再解绑
      this.$refs.game.classList.add('disabled')

      // xSet
      match.forEach((elBlock) => {
        if (xSet[elBlock.x]) {
          xSet[elBlock.x].push(elBlock.y)
        } else {
          xSet[elBlock.x] = [elBlock.y]
        }
      })
      // y 值降序
      for (let x in xSet) {
        xSet[x].sort((a, b) => b - a)
      }

      // opacity=0 + 上移 + fill
      Object.keys(xSet).forEach((x) => {
        x = parseInt(x)
        xSet[x].forEach((y, idx) => {
          const elBlock = this.elsBlocks[x][y]
          elBlock.style.opacity = 0
          eliminateSound.play()
          elBlock.setPos(x, -xSet[x].length + idx)
          if (fillElements[x]) {
            fillElements[x].push(elBlock)
          } else {
            fillElements[x] = [elBlock]
          }
        })
      })

      this.taskCount(match)

      await wait(this.delay)

      // 掉落
      Object.keys(xSet).forEach((x) => {
        x = parseInt(x)
        let botY = xSet[x][0]

        for (let y = botY - 1; y >= 0; y--) {
          if (xSet[x].indexOf(y) === -1) {
            this.elsBlocks[x][y].setPos(x, botY--)
          }
        }

        fillElements[x].forEach((elBlock, idx) => {
          elBlock.style.opacity = 1
          elBlock.setCompare()
          elBlock.setPos(x, idx)
        })
      })

      dropSound.play()

      // 更新 elsBlocks
      Object.keys(xSet).forEach((x) => {
        x = parseInt(x)
        let len = xSet[x].length
        for (let i = len - 1; i >= 0; i--) {
          this.elsBlocks[x].splice(xSet[x][i], 1)
          this.elsBlocks[x].unshift(fillElements[x][i])
        }
      })

      // 再判断
      const mergeMatch = []
      Object.keys(xSet).forEach((x) => {
        x = parseInt(x)
        let botY = xSet[x][0]

        for (let y = botY; y >= 0; y--) {
          const newMatch = this.canMatch(this.elsBlocks[x][y])
          if (newMatch) {
            newMatch.forEach((elBlock) => {
              if (mergeMatch.indexOf(elBlock) === -1) {
                mergeMatch.push(elBlock)
              }
            })
          }
        }
      })

      await wait(this.delay)

      if (mergeMatch.length) {
        this.eliminate(mergeMatch)
      } else {
        this.eliminateEnded()
      }
    },

    playMatchSound() {
      let src = ''
      if (this.eliminateTimes >= 3 && this.eliminateTimes < 5) {
        src = matchSources[0]
      } else if (this.eliminateTimes >= 5 && this.eliminateTimes < 7) {
        src = matchSources[1]
      } else if (this.eliminateTimes >= 7 && this.eliminateTimes < 9) {
        src = matchSources[2]
      } else if (this.eliminateTimes >= 9 && this.eliminateTimes < 11) {
        src = matchSources[3]
      } else if (this.eliminateTimes >= 11) {
        src = matchSources[4]
      }
      if (src) {
        const matchSound = new Audio(src)
        matchSound.play()
      }
    },

    eliminateEnded() {
      this.playMatchSound()
      this.$refs.game.classList.remove('disabled')
      this.eliminateTimes = -1
      if (this.task.every((item) => item.count === 0)) {
        // 游戏成功
        this.$emit('game-success', true) // true: 游戏成功 false: 失败
      }
    },

    // 判断相邻
    isClosed(el1, el2) {
      let x1 = el1.x
      let y1 = el1.y
      let x2 = el2.x
      let y2 = el2.y

      return (
        (x1 === x2 && Math.abs(y1 - y2) === 1) ||
        (y1 === y2 && Math.abs(x1 - x2) === 1)
      )
    },

    // active
    toggleActive(prevBlock, ...els) {
      this.prevBlock = prevBlock
      els.forEach((elBlock) => elBlock.classList.toggle('active'))
    },

    // 交换
    swap(el1, el2) {
      const swapSound = new Audio(swapSource)
      swapSound.play()
      let x1 = el1.x
      let y1 = el1.y
      let x2 = el2.x
      let y2 = el2.y

      el1.setPos(x2, y2)
      el2.setPos(x1, y1)

      // 横线
      if (y1 === y2) {
        this.elsBlocks[x1].splice(y1, 1, el2)
        this.elsBlocks[x2].splice(y1, 1, el1)
      }
      if (x1 === x2) {
        this.elsBlocks[x1].splice(y1, 1, el2)
        this.elsBlocks[x1].splice(y2, 1, el1)
      }
    },

    canMatch(el) {
      const matches = []

      let x = el.x
      let y = el.y

      // computed
      let upY = y - 1
      let downY = y + 1
      let leftX = x - 1
      let rightX = x + 1

      while (upY >= 0 && el.compare === this.elsBlocks[x][upY].compare) {
        upY--
      }

      while (
        downY < this.config.lenY &&
        el.compare === this.elsBlocks[x][downY].compare
      ) {
        downY++
      }

      while (leftX >= 0 && el.compare === this.elsBlocks[leftX][y].compare) {
        leftX--
      }

      while (
        rightX < this.config.lenX &&
        el.compare === this.elsBlocks[rightX][y].compare
      ) {
        rightX++
      }

      // 直线
      if (downY - upY >= 4) {
        for (let y = upY + 1; y < downY; y++) {
          matches.push(this.elsBlocks[x][y])
        }
      }

      // 横线
      if (rightX - leftX >= 4) {
        for (let x = leftX + 1; x < rightX; x++) {
          if (matches.indexOf(this.elsBlocks[x][y]) === -1) {
            matches.push(this.elsBlocks[x][y])
          }
        }
      }

      return matches.length ? matches : false
    },

    multiCanMatch(...els) {
      const mergeMatch = []
      els.forEach((el) => {
        const newMatch = this.canMatch(el)
        if (newMatch) {
          newMatch.forEach((elBlock) => {
            if (mergeMatch.indexOf(elBlock) === -1) {
              mergeMatch.push(elBlock)
            }
          })
        }
      })
      return mergeMatch.length ? mergeMatch : false
    },

    taskCount(match) {
      this.task.map((item, idx) => {
        match.forEach((elBlock) => {
          if (item.compare === elBlock.compare) {
            if (item.count > 0) {
              item.count--
              this.$emit('update-count', idx)
            }
          }
        })
      })
    },

    updateStep() {
      this.$emit('update-step', --this.step)
    }
  }
}
</script>
<style lang="less">
@import url('../assets/styles/var');
.game {
  position: relative;
  margin: 20px auto 0;
  overflow: hidden;

  .block {
    position: absolute;
    border-radius: 8px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 140%;
    background-color: rgba(60, 60, 60, 0.6);
    transition-property: top, left, right, bottom;
    transition-duration: 0.3s;

    &.active {
      background-color: @main-color;
    }
  }
}
</style>
