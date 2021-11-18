<!--
 * @Description: 游戏工具栏
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:17:38
 * @LastEditTime: 2021-11-15 08:55:29
-->

<template>
  <div class="game-topbar">
    <div class="game-topbar-header">
      <div class="game-topbar-header-left">
        <i class="el-icon-back"></i>
        <span>第{{ level }}关</span>
      </div>
      <div class="game-topbar-header-right">
        <!-- el-icon-bell -->
        <i class="el-icon-message-solid"></i>
        <!-- el-icon-video-pause -->
        <i class="el-icon-video-play"></i>
      </div>
    </div>

    <div class="game-topbar-info">
      <div>{{ step }}</div>
      <div>
        <el-badge v-for="item in task" :key="item.target" :value="item.count">
          <div class="block"></div>
        </el-badge>
      </div>
    </div>
  </div>
</template>
<script>
import { configs } from '../config'
export default {
  name: 'GameTopbar',
  data() {
    return {
      task: configs[this.level].task,
      step: configs[this.level].step
    }
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  methods: {
    choose() {
      this.$emit('choose')
    }
  }
}
</script>
<style lang="less">
.game-topbar {
  &-header {
    background-color: red;
    display: flex;
    justify-content: space-between;
  }

  &-info {
    display: flex;
    justify-content: space-between;
  }

  .block {
    width: 40px;
    height: 40px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 140%;
    background-color: pink;
    margin-right: 1px;
  }
}
</style>
