<script>
import { Line, mixins} from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  name: "chart",
  data() {
    return {
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        cutoutPercentage: 0,
        responsive: true,
        title: {
          display: true,
          text: "価格遷移",
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "日付",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                userCallback: function (tick) {
                  return tick.toString() + "万円";
                },
              },
              scaleLabel: {
                display: true,
                labelString: "価格",
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    getData: async function () {
      const res = await axios.get("http://localhost:8080/v1/graph");
      this.all = res.data;
      this.refresh();
    },
    refresh: async function () {
      this.data.labels = this.all.labels;
      this.data.datasets = this.all.datasets;
      this.renderChart(this.data, this.options);
      this.$emit('finishLoad')
    },
    filterData: async function (target) {
      this.data.labels = this.all.labels;
      this.data.datasets = this.all.datasets.filter(dataset => dataset.label.includes(target));
      this.renderChart(this.data, this.options);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>