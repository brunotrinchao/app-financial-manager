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
    await this.indexAccounts();
  },
  async mounted() {
    EventBus.$on('update-list', async () => {
      await this.indexAccounts();
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
