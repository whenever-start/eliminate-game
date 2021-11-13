<!--
 * @Description: 消消乐
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-11 18:24:18
 * @LastEditTime: 2021-11-12 09:11:49
-->

<template>
  <div id="app" class="wrapper">
    <!-- <Login ref="login" @click="enterGame" />
    <GameWrap ref="gameWrap" class="hidden" /> -->
    <Login ref="login" @click="enterGame" class="hidden" />
    <GameWrap ref="gameWrap" />
  </div>
</template>

<script>
import Login from 'views/Login'
import GameWrap from 'views/GameWrap'
export default {
  components: {
    Login,
    GameWrap
  },
  methods: {
    enterGame() {
      this.toggleView(this.$refs.login.$el, this.$refs.gameWrap.$el)
    },
    toggleView(...views) {
      views.forEach((view) => view.classList.toggle('hidden'))
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.hidden {
  display: none;
}

.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #9e9e9e;
}
</style>
