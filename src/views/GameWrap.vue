<!--
 * @Description: Game wrap
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:24:23
 * @LastEditTime: 2021-11-15 08:41:44
-->
<template>
  <div class="game-wrap">
    <GameTopbar :level="level" :task="task" :step="step" />

    <Game
      ref="game"
      :config="config"
      @update-step="updateStep"
      @update-count="updateCount"
      @game-success="finishBox"
    />

    <!-- 关卡 弹窗 -->
    <el-dialog
      :title="succeed ? '游戏成功' : '游戏失败'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      :center="true"
      width="100%"
    >
      <div class="finish-box" v-if="succeed">
        <el-button type="info" @click="restart">重玩一局</el-button>
        <el-button type="primary" @click="nextGame">下一关</el-button>
      </div>
      <div class="finish-box" v-else>
        <el-button type="primary" @click="restart">重来一次</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GameTopbar from 'components/GameTopbar'
import Game from 'views/Game'

import _ from 'lodash'
import { configs } from '../config'
import { get, set } from 'assets/js/store'
console.log('configs', configs)

export default {
  components: {
    GameTopbar,
    Game
  },
  data() {
    return {
      dialogVisible: false,
      configs: [],
      level: 0, // level = 0 : 第一关
      step: 0,
      succeed: false
    }
  },
  computed: {
    task() {
      return this.configs[this.level].task
    },
    config() {
      return this.configs[this.level]
    }
  },
  created() {
    this.initData()
    this.level = get('level', 0)
    if (this.level >= configs.length) {
      this.level = 0
      set('level', this.level)
    }
  },
  methods: {
    initData() {
      this.configs = _.cloneDeep(configs)
      this.step = this.configs[this.level].step
    },
    updateStep(step) {
      this.step = step
    },
    updateCount(idx) {
      this.configs[this.level].task[idx].count--
    },
    restart() {
      this.initData()
      this.$refs.game.restartGame()
      this.dialogVisible = false
    },
    nextGame() {
      this.initData()
      this.level = this.level < configs.length - 1 ? this.level + 1 : 0
      set('level', this.level)
      this.$refs.game.nextGame()
      this.dialogVisible = false
    },
    finishBox(succeed) {
      this.succeed = succeed
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less">
.game-wrap {
  .choose-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 150px;

    .item {
      width: 60px;
      height: 60px;
      background-color: pink;
      color: #fff;
      border-radius: 50%;
      text-align: center;
      line-height: 60px;
    }
  }

  .finish-box {
    display: flex;
    justify-content: center;
  }
}
</style>
