<template>
  <div id="header">
    <div id="header-nav">
      <router-link to="/signin">SignIn</router-link> |
      <router-link to="/graph">Graph</router-link> |
      <router-link to="/cars">Cars</router-link> |
      <router-link to="/stores">Stores</router-link> |
      <router-link to="/details">Details</router-link>
    </div>
  </div>
</template>

<style lang="scss">

#header-nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
