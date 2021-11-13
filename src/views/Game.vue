<!--
 * @Description: 游戏主要部分
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:00:00
 * @LastEditTime: 2021-11-13 22:32:34
-->

<template>
  <div class="game" ref="game"></div>
</template>
<script>
import { configs, base } from '../config'
import { Block } from 'assets/js/class'

export default {
  name: 'Game',
  data() {
    return {
      level: 0,
      elsBlocks: [],
      prevBlock: null
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
      console.log('初始化 elsBlocks:', this.elsBlocks)
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

    click(el) {
      console.log('当前点击:', el)
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
        rightX--
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

      console.log('return:', matches.length ? matches : false)

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
  // border: 1px solid #000;
  background-color: #35acff;

  .block {
    position: absolute;
    border-radius: 8px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 140%;
    background-color: @main-color;
    background-color: rgba(60, 60, 60, 0.6);
  }
}
</style>
