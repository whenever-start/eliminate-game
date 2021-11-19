<!--
 * @Description: 游戏工具栏
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:17:38
 * @LastEditTime: 2021-11-20 02:26:20
-->

<template>
  <div class="game-topbar">
    <div class="game-topbar-header">
      <div class="game-topbar-header-left">
        <i class="el-icon-back"></i>
        <span>第{{ level + 1 }}关</span>
      </div>
      <div class="game-topbar-header-right">
        <!-- el-icon-bell -->
        <i class="el-icon-message-solid"></i>
        <!-- el-icon-video-pause -->
        <i class="el-icon-video-play"></i>
      </div>
    </div>

    <div class="game-topbar-info">
      <div class="round-box left">{{ step }}</div>
      <div class="round-box right">
        <el-badge
          v-for="(item, idx) in task"
          :key="item.compare"
          :value="item.count"
        >
          <div class="task" :style="taskStyle(idx)"></div>
        </el-badge>
      </div>
    </div>
  </div>
</template>
<script>
import { configs, compares } from '../config'
export default {
  name: 'GameTopbar',
  data() {
    return {
      // task: configs[this.level].task,
      // step: configs[this.level].step
      compares: compares
    }
  },
  computed: {
    task() {
      return configs[this.level].task
    },
    step() {
      return configs[this.level].step
    }
    // taskStyle() {
    //   console.log(
    //     '参数:',
    //     this.level,
    //     configs[this.level],
    //     configs[this.level].task,
    //     configs[this.level].task.compare
    //   )
    //   let src = compares[configs[this.level].task[0].compare]
    //   return {
    //     backgroundImage: `url(${src})`
    //   }
    // }
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
    },
    taskStyle(idx) {
      let src = compares[configs[this.level].task[idx].compare]
      return {
        backgroundImage: `url(${src})`
      }
    }
  }
}
</script>
<style lang="less">
.round-box {
  // padding: 10px;
  background-color: #ff9074;
  border-radius: 19px;
  height: 38px;
}

.game-topbar {
  background-color: #fbdac7;
  height: 80px;
  padding: 10px 20px;
  color: #8d5540;
  &-header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    [class^='el-icon'] {
      font-size: 18px;
    }

    &-left > *,
    &-right > * {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  &-info {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;

    .round-box {
      display: flex;
      align-items: center;
      justify-content: center;

      &.left {
        width: 80px;
        color: #fff;
        font-size: 28px;
        font-weight: bold;
      }

      &.right {
        width: 98px;
      }
    }

    .task {
      width: 28px;
      height: 28px;
      background-repeat: no-repeat;
      background-size: 130%;
      background-position: center;
    }
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
