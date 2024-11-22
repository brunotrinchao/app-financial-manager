export default {
  name: 'Indicators',

  props: {
    color: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      // chartOptions: {
      //   chart: {
      //     id: 'vuechart-example',
      //     height: 50,
      //     toolbar: {
      //       show: false
      //     }
      //   },
      //   xaxis: {
      //     type: 'category',
      //     categories: [],
      //     labels: {
      //       show: false
      //     },
      //     axisBorder: {
      //       show: false
      //     },
      //     axisTicks: {
      //       show: false
      //     },
      //     crosshairs: {
      //       show: false
      //     },
      //     lines: {
      //       show: false
      //     }
      //   },
      //   yaxis: {
      //     show: false
      //   },
      //   legend: {
      //     show: false
      //   },
      //   dataLabels: {
      //     enabled: false,
      //     background: {
      //       enabled: false
      //     }
      //   },
      //   fill: {
      //     type: 'gradient',
      //     gradient: {
      //       shadeIntensity: 1,
      //       opacityFrom: 0.7,
      //       opacityTo: 0.9,
      //       stops: [0, 90, 100]
      //     }
      //   },
      //   tooltip: {
      //     enabled: false
      //   },
      //   grid: {
      //     show: false
      //   }
      // },
      // series: [
      //   {
      //     name: 'series-1',
      //     hidden: false,
      //     data: [10, 20, 30, 40, 50, 60, 80, 90, 100]
      //   }
      // ]
    };
  }
};
