<template>
  <el-row>
    <el-col id="subheader">
      <div style="margin-top: 15px">
        <el-select v-model="target" placeholder="グレード">
          <el-option
            v-for="item in grades"
            :key="item.grade_id"
            :label="item.grade"
            :value="item.grade"
          >
          </el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-success"
          @click="filterGrade()"
        ></el-button>
        <el-button type="info" round @click="refresh()"
          >絞り込みクリア</el-button
        >
      </div>
    </el-col>

    <el-col id="graph">
      <div class="canvas-container">
        <LineChart ref="LineChart"></LineChart>
      </div>
    </el-col>
  </el-row>
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
      target: "",
    };
  },
  created: async function () {
    const grade_res = await axios.get(this.grade_apiURL);
    this.grades = grade_res.data.grades;
  },
  methods: {
    filterGrade: async function () {
      this.$refs.LineChart.filterData(this.target);
    },
    refresh: async function () {
      this.target = "";
      this.$refs.LineChart.refresh();
    },
  },
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 300px;
}

#subheader {
  text-align: right;
}

#graph {
  margin-top: 10px;
  text-align: center;
  height: 1000px;
}
</style>