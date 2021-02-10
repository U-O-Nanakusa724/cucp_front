<template>
  <div id="header">
    <div id="header-nav">
      <router-link to="/">Home</router-link> |
      <router-link to="../cars">Cars</router-link> |
      <router-link to="../stores">Stores</router-link> |
      <router-link to="../details">Details</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#header-nav {
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
