export default {
  name: 'Preloader',
  data() {
    return {
      loading: false
    };
  },
  created() {
    // Escuta os eventos para controlar a exibição do preloader
    this.$eventBus.$on('loading:start', () => {
      this.loading = true;
    });
    this.$eventBus.$on('loading:stop', () => {
      this.loading = false;
    });
  },
  beforeDestroy() {
    // Remove os eventos ao destruir o componente
    this.$eventBus.$off('loading:start');
    this.$eventBus.$off('loading:stop');
  }
};
