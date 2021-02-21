<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  name: "chart",
  data() {
    return {
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Line Dataset",
            data: [
              {
                x: "January",
                y: 0,
              },
              {
                x: "March",
                y: 10,
              },
              {
                x: "May",
                y: 5,
              },
            ],
            borderColor: "#CFD8DC",
            fill: false,
            lineTension: 0.3,
            borderWidth: 3,
            spanGaps: true,
          },
        ],
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
    getData: async function () {},
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>