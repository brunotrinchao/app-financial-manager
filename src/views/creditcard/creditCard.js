import { EventBus } from '@/event-bus';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CreditCard',
  data() {
    return {
      items: [],
      perPage: 10,
      currentPage: null,
      totalPage: null,
      fields: [
        { label: 'Nome', key: 'name' },
        { label: 'Limite disponível', key: 'available_limit' },
        { label: 'Limite', key: 'limit' }
      ],
      form: {
        name: ''
      }
    };
  },
  computed: {
    getItems() {
      return this.formatItems(this.creditcards);
    },
    ...mapGetters('creditcards', ['creditcards'])
  },
  async beforeMount() {
    await this.indexCreditCards();
  },
  async mounted() {
    EventBus.$on('update-list', async () => {
      await this.indexCreditCards();
    });
  },
  beforeDestroy() {
    EventBus.$off('update-list', this.indexCreditCards);
  },
  methods: {
    onRowSelected(items) {
      this.$modalManager.show({
        id: 'formEditCreditCards',
        title: 'Editar cartão de crédito',
        size: 'md',
        component: () => import('./form/index.vue'),
        selectedItem: items
      });
    },
    formatItems(itemsArr) {
      return itemsArr.map((el) => {
        return {
          id: el.id,
          name: el.name,
          limit: parseFloat(el.limit).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
          available_limit: parseFloat(el.available_limit).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        };
      });
    },
    ...mapActions('creditcards', ['indexCreditCards'])
  }
};
