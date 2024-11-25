import { mapGetters, mapState, mapActions } from 'vuex';
import { EventBus } from '@/event-bus';
import StrHelpMixin from '@/mixins/strHelpMixin.js';

export default {
  name: 'Transactions',
  mixins: [StrHelpMixin],
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { label: 'Data', key: 'date', sortable: true },
        { label: 'Categoria', key: 'category', sortable: true },
        { label: 'Tipo', key: 'type', sortable: true },
        { label: 'Metodo', key: 'method', sortable: true },
        { label: 'Valor', key: 'value', sortable: true },
        { lavel: 'Status', key: 'status', sortable: true }
      ],
      items: [],
      perPage: 10,
      currentPage: null,
      totalPage: null,
      filter: {
        category: null,
        type: null,
        method: null,
        status: null
      },
      options: {
        category: [
          { text: 'Alimentação', value: 1 },
          { text: 'Moradia', value: 1 },
          { text: 'Transporte', value: 1 },
          { text: 'Educação', value: 1 },
          { text: 'Lazer', value: 1 },
          { text: 'Saúde', value: 1 },
          { text: 'Investimentos', value: 1 },
          { text: 'Contas e Serviços', value: 1 },
          { text: 'Roupas e Acessórios', value: 1 },
          { text: 'Outros Gastos', value: 1 }
        ],
        type: [
          { text: 'Entrada', value: 'IN' },
          { text: 'Saída', value: 'OUT' }
        ],
        method: [
          { text: 'Crédito', value: 'CREDIT_CARD' },
          { text: 'Débito', value: 'DEBIT_CARD' },
          { text: 'Pix', value: 'PIX' }
        ],
        status: [
          { text: 'Pago', value: 'PAGO' },
          { text: 'Agendado', value: 'AGENDADO' },
          { text: 'Em atraso', value: 'ATRASADO' }
        ]
      },
      formattedFilters: [],

      transactions: []
    };
  },

  watch: {
    filters: {
      async handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.formatFilter(newVal);
          await this.fetchTransactions(this.currentPage);
        }
      },
      // immediate: true,
      deep: true
    },
    pagination: {
      handler(newVal) {
        // this.currentPage = newVal.current_page;
        this.totalPage = newVal.total;
      },
      immediate: true,
      deep: true
    }
    // currentPage: {
    //   handler: async (newVal) => {
    //     await this.fetchTransactions(newVal);
    //   },
    //   deep: true
    // }
  },

  computed: {
    getCategoriesList() {
      return [
        { value: null, text: 'Selecione' },
        ...this.categories?.map((el) => {
          return { value: el.id, text: el.name };
        })
      ];
    },
    getTypesList() {
      const types = Array.isArray(this.settings?.type) ? this.settings.type : [];
      return [
        { value: null, text: 'Selecione' },
        types.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getMethodsList() {
      const method = Array.isArray(this.settings?.method) ? this.settings.method : [];
      return [
        { value: null, text: 'Selecione' },
        method.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getStatusList() {
      const status = Array.isArray(this.settings?.status) ? this.settings.status : [];
      return [
        { value: null, text: 'Selecione' },
        status.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getItems() {
      return this.items;
    },
    ...mapState(['filters', 'settings']),
    ...mapGetters('transactions', ['pagination']),
    ...mapState('categories', ['categories'])
  },

  async mounted() {
    EventBus.$on('update-list', async () => {
      // await this.fetchTransactions(this.currentPage);
    });
  },
  beforeDestroy() {
    // EventBus.$off('update-list', this.fetchTransactions);
  },

  methods: {
    onRowSelected(items) {
      console.log(items);
    },
    onSubmit(event) {
      event.preventDefault();
      this.saveFilter(this.filter);
      this.$refs['filters-transactions'].hide();
    },
    resetFilters() {
      this.filter = {
        category: null,
        type: null,
        method: null,
        status: null
      };
      this.saveFilter(this.filter);
      this.$refs['filters-transactions'].hide();
    },
    onReset() {
      return true;
    },
    async formatFilter(filters) {
      const formatPeriod = (value) => {
        if (value && value.startDate && value.endDate) {
          const startDateFormatted = this.$moment(value.startDate).format('DD/MM/YYYY');
          const endDateFormatted = this.$moment(value.endDate).format('DD/MM/YYYY');
          return startDateFormatted !== endDateFormatted ? `${startDateFormatted} até ${endDateFormatted}` : startDateFormatted;
        }
        return null;
      };
      this.formattedFilters = Object.keys(filters)
        .map((key) => {
          let value = filters[key];

          if (key === 'period') {
            value = formatPeriod(value); // Usa a função de formatação
          }

          if (key === 'category') {
            value = this.categories
              .filter((el) => {
                return el.id == value;
              })
              .map((el) => el.name)[0];
          }

          return {
            text: this.translateFilterKey(key),
            value: value ? this.translate(value) : null
          };
        })
        .filter((item) => item.value !== null);
    },
    translateFilterKey(key) {
      const translations = {
        period: 'Período',
        category: 'Categoria',
        type: 'Tipo',
        method: 'Método',
        status: 'Status'
      };

      return translations[key] || key;
    },
    saveFilter(filter) {
      let filters = [];
      Object.keys(filter).forEach((el) => {
        filters.push({ [el]: filter[el] });
      });
      this.setFilters(filters);
    },
    formatStatus(status) {
      const name = this.translate(status);
      switch (status) {
        case 'pending':
          return { name, color: 'warning' };
        case 'scheduled':
          return { name, color: 'info' };
        case 'canceled':
          return { name, color: 'secondary' };
        case 'overdue':
          return { name, color: 'danger' };
        case 'paid':
          return { name, color: 'success' };
        default:
          break;
      }
    },
    formatType(type) {
      return this.translate(type);
    },
    async fetchTransactions(page) {
      page = page ?? 1;
      const startDate = this.filters?.period?.startDate ? this.filters.period.startDate.format('YYYY-MM-DD') : null;

      const endDate = this.filters?.period?.endDate ? this.filters.period.endDate.format('YYYY-MM-DD') : null;

      let params = { ...this.filters };
      delete params.period;

      this.transactions = await this.indexTransactions({
        page: page,
        per_page: this.perPage,
        orderBy: {
          field: 'transaction_date'
        },
        date: {
          startDate,
          endDate
        },
        ...params
      });

      if (this.transactions.length > 0) {
        this.items = this.formatItems();
      }

      // TODO - Corrigir paginação
      this.$nextTick(() => {
        this.$root.$emit('bv::refresh::table', 'table-transactions');
      });
    },
    formatItems() {
      return this.transactions?.map((el) => {
        return {
          id: el.id,
          date: this.$moment(el.transaction_date).format('DD/MM/YYYY'),
          category: el.category?.name,
          type: { name: this.formatType(el?.type), color: el?.type === 'income' ? 'success' : 'danger' },
          method: this.translate(el?.method),
          value: el.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          status: this.formatStatus(el?.status),
          typeName: this.formatType(el?.type)
        };
      });
    },
    async openFilter() {
      await this.indexCategories();
      this.$root.$emit('bv::toggle::collapse', 'sidebarFilter');
    },
    ...mapActions(['setFilters']),
    ...mapActions('transactions', ['indexTransactions']),
    ...mapActions('categories', ['indexCategories'])
  }
};
