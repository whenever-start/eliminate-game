<!--
 * @Description: 消消乐
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-11 18:24:18
 * @LastEditTime: 2021-11-14 20:44:32
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
import { toggleView } from 'assets/js/utils'
export default {
  components: {
    Login,
    GameWrap
  },
  methods: {
    enterGame() {
      toggleView('hidden', this.$refs.login.$el, this.$refs.gameWrap.$el)
    }
    // toggleView(...views) {
    //   views.forEach((view) => view.classList.toggle('hidden'))
    // }
  }
}
</script>

<style lang="less">
@import '~assets/styles/common.less';
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
