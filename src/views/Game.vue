<!--
 * @Description: 游戏主要部分
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:00:00
 * @LastEditTime: 2021-11-15 01:38:34
-->

<template>
  <div class="game" ref="game"></div>
</template>
<script>
import { configs, base } from '../config'
import { Block } from 'assets/js/class'
import { wait } from 'assets/js/utils'

export default {
  name: 'Game',
  data() {
    return {
      level: 0,
      elsBlocks: [],
      prevBlock: null,
      // 消除次数
      eliminateTimes: -1,
      delay: 300
    }
  },
  methods: {
    initGame(config) {
      this.initStyle(config)
      this.initBlocks(config)
      this.initCompares()
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
      let src = require('assets/music/click.bubble.mp3')
      const sound = new Audio(src)
      sound.play()
      if (this.prevBlock) {
        // prev 存在
        if (this.isClosed(this.prevBlock, elBlock)) {
          // 相邻
          this.swap(this.prevBlock, elBlock)
          let matches2 = this.canMatch(elBlock)
          let matches1 = this.canMatch(this.prevBlock)

          if (!matches1 && !matches2) {
            await wait(this.delay)
            this.swap(elBlock, this.prevBlock)
          } else if (matches1 && matches2) {
            this.eliminate(matches1)
            this.eliminate(matches2)
          } else if (matches1) {
            this.eliminate(matches1)
          } else if (matches2) {
            this.eliminate(matches2)
          }

          this.toggleActive(null, this.prevBlock)
        } else {
          // 不相邻
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
        this.toggleActive(elBlock, elBlock)
      }
    },

    /**
     * @description: 消除匹配的元素，掉落、再匹配再消除
     * @param {Array} matches 匹配元素的数组
     * @return {*}
     */
    async eliminate(matches) {
      // eliminate 音效
      let sources = [
        require('assets/music/eliminate1.mp3'),
        require('assets/music/eliminate2.mp3'),
        require('assets/music/eliminate3.mp3'),
        require('assets/music/eliminate4.mp3'),
        require('assets/music/eliminate5.mp3'),
        require('assets/music/eliminate6.mp3'),
        require('assets/music/eliminate7.mp3'),
        require('assets/music/eliminate8.mp3')
      ]
      this.eliminateTimes =
        this.eliminateTimes < sources.length - 1
          ? this.eliminateTimes + 1
          : sources.length - 1

      const eliminateSound = new Audio(sources[this.eliminateTimes])

      // 消除期间禁止点击,消除结束再解绑
      this.$refs.game.classList.add('disabled')
      // 任务：处理 dom + 更新 elsBlocks
      const fillXSet = {} // 补充方块的 x(列) 集合
      const xSet = {} // x(列)集合
      const elGame = this.$refs.game

      // 消除前等待
      await wait(this.delay)
      matches.forEach((elBlock) => {
        // 移除 dom 元素
        console.log('元素', elBlock.parentNode === elGame)
        elGame.removeChild(elBlock)
        eliminateSound.play()
        // xSet
        if (xSet[elBlock.x]) {
          xSet[elBlock.x].push(elBlock)
        } else {
          xSet[elBlock.x] = [elBlock]
        }
        // 补充 dom 元素
        const newBlock = this.createBlock(elBlock.x, -xSet[elBlock.x].length)
        newBlock.setCompare()
        console.log('new block', newBlock.parentNode === elGame)
        // fillXSet
        if (fillXSet[elBlock.x]) {
          fillXSet[elBlock.x].push(newBlock)
        } else {
          fillXSet[elBlock.x] = [newBlock]
        }
      })

      // xSet 降序
      for (let x in xSet) {
        // x = parseInt(x)
        xSet[x].sort((a, b) => b.y - a.y)
      }

      // 掉落前等待
      await wait(this.delay)

      // 处理掉落和更新 elsBlocks
      Object.keys(xSet).forEach((x) => {
        x = parseInt(x)
        let botY = xSet[x][0].y // 最下边的方块

        // 掉落(不包含新补充的方块)
        for (let y = botY - 1; y >= 0; y--) {
          if (xSet[x].indexOf(this.elsBlocks[x][y]) === -1) {
            this.elsBlocks[x][y].setPos(x, botY--)
          }
        }
        // 新补充的方块掉落
        fillXSet[x].forEach((elBlock, idx) => {
          elBlock.setPos(x, fillXSet[x].length - 1 - idx)
        })

        // 更新 elsBlocks
        xSet[x].reverse().forEach((elBlock, idx) => {
          this.elsBlocks[x].splice(elBlock.y, 1)
          this.elsBlocks[x].unshift(fillXSet[x][idx])
        })
      })

      // 再判断前等待
      await wait(this.delay)

      // 掉落后再判断和消除
      const mergeMatches = []
      let len = 0
      this.elsBlocks.forEach((cols) => {
        cols.forEach((el) => {
          len++
          console.log('els blocks', len, el.parentNode === elGame)
        })
      })

      Object.keys(xSet).forEach((x) => {
        x = parseInt(x)
        let botY = xSet[x][xSet[x].length - 1].y // 最下边的方块

        for (let y = botY; y >= 0; y--) {
          const matches = this.canMatch(this.elsBlocks[x][y])

          if (matches) {
            matches.forEach((el, idx) => {
              console.log('matches:', idx, el.parentNode === elGame)
              if (mergeMatches.indexOf(el) === -1) {
                mergeMatches.push(el)
                console.log(
                  'push:',
                  idx,
                  mergeMatches[mergeMatches.length - 1].parentNode === elGame
                )
              }
            })
          }
        }
      })
      if (mergeMatches.length) {
        mergeMatches.forEach((el) =>
          console.log('merge 元素', el.parentNode === elGame, el.parentNode)
        )
        // await wait(this.delay)

        this.eliminate(mergeMatches)
      } else {
        // 消除结束,解绑
        this.$refs.game.classList.remove('disabled')
        this.eliminateTimes = -1
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

      while (
        upY >= 0 &&
        el.getCompare() === this.elsBlocks[x][upY].getCompare()
      ) {
        upY--
      }

      while (
        downY < configs[this.level].lenY &&
        el.getCompare() === this.elsBlocks[x][downY].getCompare()
      ) {
        downY++
      }

      while (
        leftX >= 0 &&
        el.getCompare() === this.elsBlocks[leftX][y].getCompare()
      ) {
        leftX--
      }

      while (
        rightX < configs[this.level].lenX &&
        el.getCompare() === this.elsBlocks[rightX][y].getCompare()
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
    }
  },
  mounted() {
    this.initGame(configs[this.level])
  }
}
</script>
<style lang="less">
@import url('../assets/styles/var');
.game {
  position: relative;
  margin: 20px auto 0;
  overflow: hidden;
  // border: 1px solid #000;
  // background-color: #35acff;

  .block {
    position: absolute;
    border-radius: 8px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 140%;
    background-color: @main-color;
    background-color: rgba(60, 60, 60, 0.6);
    transition: 0.3s;

    &.active {
      background-color: @main-color;
    }
  }
}
</style>
