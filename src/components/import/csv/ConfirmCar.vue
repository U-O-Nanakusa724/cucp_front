<template>
  <div id="confirmCar" v-if="new_cars.length != 0">
    <el-card class="box-card" shadow="hover">
      <div id="car_card_header" slot="header">新規追加された車種</div>
      <el-table :data="new_cars" style="width: 100%">
        <el-table-column prop="name" label="車種名" width="300" />
      </el-table>
    </el-card>
  </div>
  <div id="confirmCar" v-else>新規追加された車種はありませんでした。</div>
</template>

<script>
export default {
  props: ["new_cars"],
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#confirmCar {
  text-align: center;
}

#car_card_header {
  text-align: left;
}
</style>