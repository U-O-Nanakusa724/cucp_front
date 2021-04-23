<template>
  <div id="confirmGrade" v-if="new_grades.length != 0">
    <el-card class="box-card" shadow="hover">
      <div id="grade_card_header" slot="header">新規追加されたグレード</div>
      <el-table :data="new_grades" style="width: 100%">
        <el-table-column prop="car.name" label="車種名" width="200" />
        <el-table-column prop="grade" label="グレード名" width="300" />
      </el-table>
    </el-card>
  </div>
  <div id="confirmGrade" v-else>新規追加されたグレードはありませんでした。</div>
</template>

<script>
export default {
  props: ["new_grades"],
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#confirmGrade {
  text-align: center;
}

#grade_card_header {
  text-align: left;
}
</style>