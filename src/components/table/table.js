export default {
  name: 'Table',

  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      default: 5 // Número padrão de itens por página
    }
  },

  data() {
    return {
      currentPage: 1
    };
  },

  computed: {
    // Filtra os itens para exibir apenas os da página atual
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.items.slice(start, start + this.perPage);
    }
  },

  methods: {
    onRowClick(item) {
      // Emite o item clicado para o componente pai
      this.$emit('row-click', item);
    }
  }
};
