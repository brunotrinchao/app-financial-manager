import { Table } from '@/components';
import { EventBus } from '@/event-bus';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Account',
  components: { Table },
  data() {
    return {
      items: [],
      perPage: 10,
      currentPage: null,
      totalPage: null,
      fields: [
        { label: 'Nome', key: 'name' },
        { label: 'Banco', key: 'bank' },
        { label: 'Saldo', key: 'balance' }
      ],
      form: {
        name: ''
      }
    };
  },
  computed: {
    getItems() {
      return this.formatItems(this.accounts);
    },
    ...mapGetters('accounts', ['accounts'])
  },
  async beforeMount() {
    await this.fetchAccounts();
  },
  async mounted() {
    EventBus.$on('update-list', async () => {
      await this.fetchAccounts();
    });
  },
  methods: {
    onRowSelected(items) {
      this.$modalManager.show({
        id: 'formEditAccounts',
        title: 'Editar aconta',
        size: 'md',
        component: () => import('./form/index.vue'),
        selectedItem: items
      });
    },
    async fetchAccounts(page) {
      page = page ?? 1;

      const itemsArr = await this.indexAccounts({
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
          bank: el.bank.name,
          balance: parseFloat(el.balance).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        };
      });
    },
    ...mapActions('accounts', ['indexAccounts'])
  }
};
