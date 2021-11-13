<!--
 * @Description: 登录
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-11 21:43:10
 * @LastEditTime: 2021-11-12 00:05:38
-->

<template>
  <div class="login">
    <el-button @click="click">登录</el-button>
    <el-button>注册</el-button>
  </div>
</template>
<script>
export default {
  name: 'Login',
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less">
.login {
  height: 100%;
  color: #fff;
  background-color: #03a9f4;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .el-button + .el-button {
    // 取消 element 原格式
    margin-left: 0;

    margin-top: 20px;
  }
}
</style>
