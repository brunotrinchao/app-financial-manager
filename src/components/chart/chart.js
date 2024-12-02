export default {
  name: 'Chart',
  props: {
    type: {
      type: String,
      default: 'pie',
      validator(value) {
        const validSizes = ['line', 'area', 'bar', 'pie', 'donut', 'scatter', 'bubble', 'heatmap', 'radialBar', 'candlestick'];
        return validSizes.includes(value);
      }
    },
    options: {
      type: Object,
      default: {},
      require: true
    },
    series: {
      type: Array,
      default: [100],
      require: true
    }
  },
  data() {
    return {
      colors: [
        '#0056b3', // Azul escuro (variação do primary)
        '#20c997', // Verde médio (variação do success)
        '#e74c3c', // Vermelho vivo (variação do danger)
        '#fd7e14', // Laranja (variação do warning)
        '#6f42c1', // Roxo (variação do secondary)
        '#d63384', // Rosa vibrante (variação adicional)
        '#495057', // Cinza escuro (complementar do dark)
        '#74c0fc', // Azul claro (variação do info)
        '#f9c74f', // Amarelo (diferente do warning)
        '#37b24d' // Verde escuro (variação alternativa do success)
      ],
      optionDefault: {
        labels: ['Sem dados'],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      },
      seriesDefault: [100]
    };
  },
  computed: {
    getOptions() {
      return {
        ...this.options,
        colors: this.series.map((_, index) => this.colors[index % this.colors.length])
      };
    },
    getSeries() {
      return this.series;
    }
  }
};
