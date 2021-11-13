<!--
 * @Description: Game wrap
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:24:23
 * @LastEditTime: 2021-11-13 22:08:15
-->
<template>
  <div class="game-wrap">
    <GameTopbar @choose="chooseLevel" />
    <Game ref="game" />
    <!-- 关卡 弹窗 -->
    <el-dialog title="关卡" :visible.sync="dialogVisible" width="100%">
      <ul class="choose-list">
        <li class="item" v-for="item in configs" :key="item.label">
          {{ item.label }}
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import GameTopbar from 'components/GameTopbar'
import Game from 'views/Game'

import { configs, base } from '../config'
console.log('configs', configs)

export default {
  components: {
    GameTopbar,
    Game
  },
  data() {
    return {
      dialogVisible: false,
      configs: configs
    }
  },
  methods: {
    chooseLevel() {
      this.dialogVisible = true
    }
  },
  mounted() {
    console.log('wrap ref:', this, base)
  }
}
</script>
GameTopbar
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
}
</style>
