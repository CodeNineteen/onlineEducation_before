<template>
  <div id="app">
<!--    页面中引入router，展示内容-->
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  watch: {
    $route(to,from) {
      console.log('to')
      console.log(to)
      if (to.path !='/login') {
        let obj = {
          name:to.name,
          title:to.meta.title
        }
        this.$store.commit('addTab',obj)
      }
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
