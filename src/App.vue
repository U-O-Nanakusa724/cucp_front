<template>
  <el-container id="app">
    <Aside/>
    <el-container>
      <el-header><Header/></el-header>
      <el-main><router-view/></el-main>
      <el-footer><Footer/></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./components/common/Aside";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default {
  name: "app",
  components: {
    Aside,
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
