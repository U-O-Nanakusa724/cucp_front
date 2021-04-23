<template>
  <div v-if="detail_id == null">
    <el-tag type="success" disable-transitions>
      <span>new</span>
    </el-tag>
  </div>
  <div v-else-if="detail_id == 0">
    <el-tag type="warning" disable-transitions>
      <span>edited</span>
    </el-tag>
  </div>
  <div v-else>
    <el-tag type="primary" disable-transitions>
      <span>add</span>
    </el-tag>
  </div>
</template>

<script>
export default {
  props: ["detail_id"],
};
</script>

<style lang="scss">
</style>

detail_id == null