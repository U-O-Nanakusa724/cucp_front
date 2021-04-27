<template>
  <div id="confirmColor" v-if="new_colors.length != 0">
    <el-card class="box-card" shadow="hover">
      <div id="color_card_header" slot="header">新規追加された車体カラー(カラーコードは暫定で白になっています)</div>
      <el-table :data="new_colors" style="width: 100%">
        <el-table-column prop="label" label="色" width="150"/>
      </el-table>
    </el-card>
  </div>
  <div id="confirmColor" v-else>新規追加された車体カラーはありませんでした。</div>
</template>

<script>
export default {
  props: ["new_colors"],
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#confirmColor {
  text-align: center;
}

#color_card_header {
  text-align: left;
}
</style>