<!--
 * @Description: 游戏工具栏
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 00:17:38
 * @LastEditTime: 2021-11-12 04:27:56
-->

<template>
  <div class="game-topbar">
    <span>时间</span>
    <span>关卡</span>
    <el-button>提示</el-button>
    <el-button>重排</el-button>
    <el-button>重新开始</el-button>
    <el-button @click="choose">选择关卡</el-button>
  </div>
</template>
<script>
export default {
  name: 'GameTopbar',
  methods: {
    choose() {
      this.$emit('choose')
    }
  }
}
</script>
<style lang="less">
.game-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
