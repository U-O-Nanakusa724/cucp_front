<template>
  <div id="header">
    {{ pageTitle }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      pageTitle:'pageTitle/pageTitle',
    }),
  },
};
</script>

<style lang="scss">
#header {
  padding: 10px;
  text-align: center;
  font-size: 25px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
