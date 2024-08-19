<template>
  <Menu>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/user">Users</router-link>
    <router-link to="/category">Categories</router-link>
  </Menu>
  <router-view/>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Menu
  }
}
</script>

<style lang="scss">
</style>
