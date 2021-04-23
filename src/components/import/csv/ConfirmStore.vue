<template>
  <div id="confirmStore" v-if="new_stores.length != 0">
    <el-card class="box-card" shadow="hover">
      <div id="store_card_header" slot="header">新規追加された販売店</div>
      <el-table :data="new_stores" style="width: 100%">
        <el-table-column prop="name" label="販売店名" width="300" />
      </el-table>
    </el-card>
  </div>
  <div id="confirmStore" v-else>新規追加された販売店はありませんでした。</div>
</template>

<script>
export default {
  props: ["new_stores"],
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#confirmStore {
  text-align: center;
}

#store_card_header {
  text-align: left;
}
</style>