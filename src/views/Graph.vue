<template>
  <div class="canvas-container">
    <el-select v-model="target" placeholder="車種">
      <el-option
        v-for="item in grades"
        :key="item.id"
        :label="item.grade"
        :value="item.grade"
      >
      </el-option>
    </el-select>
    <el-button
      slot="append"
      icon="el-icon-success"
      @click="filterCar()"
    ></el-button>
    <el-button type="info" round @click="refresh()">絞り込みクリア</el-button>

    <LineChart ref="LineChart"></LineChart>
  </div>
</template>

<script>
import LineChart from "@/components/graph/LineChart";
import axios from "axios";

export default {
  name: "VueChartJS",
  components: {
    LineChart,
  },
  data() {
    return {
      grade_apiURL: process.env.VUE_APP_API_ENDPOINT + "grades",
      grades: [],
      target: '',
    };
  },
  created: async function () {
    const car_res = await axios.get(this.grade_apiURL);
    this.grades = car_res.data.grades;
  },
  methods: {
    filterCar: async function () {
      this.$refs.LineChart.filterData(this.target);
    },
    refresh: async function () {
      this.target = ''
      this.$refs.LineChart.refresh();
    },
  },
};
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: calc(100% - 40px);
  height: calc(100% - 20px);

  margin: 20px;
}
</style>