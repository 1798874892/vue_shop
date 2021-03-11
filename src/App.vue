<template>
  <div id="app">
<<<<<<< HEAD
    <!-- 路由占位符 -->
    <router-view></router-view>
=======
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
>>>>>>> 08784de5d9d2d7298ad6d9352b53fc09fdaee8d0
  </div>
</template>

<script>
<<<<<<< HEAD

export default {
  name: 'app'
=======
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
>>>>>>> 08784de5d9d2d7298ad6d9352b53fc09fdaee8d0
}
</script>

<style>
<<<<<<< HEAD

</style>
=======
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
>>>>>>> 08784de5d9d2d7298ad6d9352b53fc09fdaee8d0
