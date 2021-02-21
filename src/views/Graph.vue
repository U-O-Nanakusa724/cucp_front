<template>
  <div class="canvas-container">
    <LineChart></LineChart>
  </div>
</template>

<script>
import LineChart from "@/components/graph/LineChart";

export default {
  name: "VueChartJS",
  components: {
    LineChart,
  },
};
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  
  margin: 20px;
}
</style>