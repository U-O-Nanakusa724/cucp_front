<template>
  <el-tooltip class="color-tip" effect="light" placement="top">
    <div slot="content">{{ label }}</div>
    <el-button class="color-icon" circle :style="color"></el-button>
  </el-tooltip>
</template>

<script>
export default {
  props: ["id", "label", "color_code"],
  computed: {
    color() {
      if (this.color_code !== null) {
        return { "background-color": this.color_code };
      } else {
        return { "background-color": '#ffffff' };
      }
    },
  },
};
</script>

<style lang="scss">
#color-icon {
  padding-left: 5px;
}
</style>