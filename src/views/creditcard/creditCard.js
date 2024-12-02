import { Table } from '@/components';
import { EventBus } from '@/event-bus';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CreditCard',
  components: { Table },
  data() {
    return {
      items: [],
      perPage: 10,
      currentPage: null,
      totalPage: null,
      fields: [
        { label: 'Nome', key: 'name' },
        { label: 'Bandeira', key: 'issuer' },
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
    await this.fetchCrediCards();
  },
  async mounted() {
    EventBus.$on('update-list', async () => {
      await this.fetchCrediCards();
    });
  },
  beforeDestroy() {
    EventBus.$off('update-list', this.fetchCrediCards);
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
    async fetchCrediCards(page) {
      page = page ?? 1;

      const itemsArr = await this.indexCreditCards({
        page: page,
        per_page: this.perPage,
        orderBy: {
          field: 'name'
        }
      });

      if (itemsArr.length > 0) {
        this.items = this.formatItems(itemsArr);
      }
      return { items: this.items };
    },
    formatItems(itemsArr) {
      return itemsArr.map((el) => {
        return {
          id: el.id,
          name: el.name,
          issuer: el.issuer.name,
          limit: parseFloat(el.limit).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
          available_limit: parseFloat(el.available_limit).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        };
      });
    },
    ...mapActions('creditcards', ['indexCreditCards'])
  }
};
