import { mapGetters, mapState, mapActions } from 'vuex';
import { EventBus } from '@/event-bus';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
import { Table } from '@/components';

export default {
  name: 'Transactions',
  mixins: [StrHelpMixin],
  components: { Table },
  data() {
    return {
      goRequest: true,
      tableNewId: this.$moment().valueOf().toString(),
      sortBy: 'transaction_date',
      sortDesc: false,
      fields: [
        { label: 'Data', key: 'transaction_date', sortable: true },
        { label: 'Usuário', key: 'user', sortable: true },
        { label: 'Categoria', key: 'category', sortable: true },
        { label: 'Tipo', key: 'type', sortable: true },
        { label: 'Metodo', key: 'method', sortable: true },
        { label: 'Valor', key: 'value', sortable: true },
        { label: 'Descrição', key: 'description', sortable: false },
        { label: 'Status', key: 'status', sortable: true }
      ],
      items: [],
      paginate: {},
      perPage: 10,
      currentPage: 1,
      totalPage: null,
      filter: {
        category: null,
        type: null,
        method: null,
        status: null
      },
      formattedFilters: [],
      transactions: []
    };
  },

  watch: {
    filters: {
      async handler(newVal) {
        this.formatFilter(newVal);
        await this.fetchTransactions(this.currentPage);
        this.$refs.tableTansaction.refreshTable();
      },
      // immediate: true,
      deep: true
    },
    pagination: {
      handler(newVal) {
        this.totalPage = newVal.total;
      },
      immediate: true,
      deep: true
    }
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
        ...types.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getMethodsList() {
      const method = Array.isArray(this.settings?.method) ? this.settings.method : [];
      return [
        { value: null, text: 'Selecione' },
        ...method.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getStatusList() {
      const status = Array.isArray(this.settings?.status) ? this.settings.status : [];
      return [
        { value: null, text: 'Selecione' },
        ...status.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getItems() {
      return this.items;
    },
    getColunms() {
      const colunms = Array.isArray(this.fields) ? this.fields : [];
      return [
        ...colunms.map((el) => {
          return { value: el.key, text: el.label };
        })
      ];
    },
    getLegends() {
      return this.showLegendas();
    },
    ...mapState(['filters', 'settings']),
    ...mapGetters('transactions', ['pagination']),
    ...mapState('categories', ['categories'])
  },

  async mounted() {
    EventBus.$on('update-list', async () => {
      console.log('Mounted');
      await this.fetchTransactions(this.currentPage);
    });
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    EventBus.$off('update-list', this.fetchTransactions);
  },

  methods: {
    onRowSelected(items) {
      this.$modalManager.show({
        id: 'formEditTransaction',
        title: 'Editar lançamento',
        size: 'md',
        component: () => import('./form/index.vue'),
        selectedItem: items
      });
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
          return { name, color: 'dark' };
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

      const params = {
        ...this.filters,
        page,
        per_page: this.perPage,
        orderBy: {
          field: 'transaction_date'
        },
        date: { startDate, endDate }
      };

      delete params.period;

      const response = await this.indexTransactions(params);

      if (response?.items?.length > 0) {
        this.items = this.formatItems(response.items);
        this.paginate = response.paginate;
      }
      return { items: this.items, paginate: this.paginate };

      // TODO - Corrigir paginação
      // this.$nextTick(() => {
      // console.log(this.$refs);
      // this.$refs.tableTransactions.refresh();
      // this.$root.$emit('bv::refresh::table', 'tableTransactions');
      // this.tableNewId = this.$moment().valueOf().toString();
      // });
    },
    formatItems(itens) {
      return itens.map((el) => {
        return {
          id: el.id,
          transaction_date: this.$moment(el.transaction_date).format('DD/MM/YYYY'),
          category: el.category?.name,
          type: {
            name: this.translate(el?.type),
            color: el?.type === 'income' ? 'success' : 'danger',
            icon: this.getIcon('type', el?.type)
          },
          method: {
            name: this.translate(el?.method),
            icon: this.getIcon('methods', el?.method)
          },
          value: el.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          status: this.formatStatus(el?.status),
          description: el.description ? this.abbreviateText(el.description, 15) : '',
          typeName: this.translate(el?.type),
          user: { name: el?.user.name, avatar: el?.user.avatar, text: this.getInitials(el?.user.name) }
        };
      });
    },
    async openFilter() {
      await this.indexCategories();
      this.$root.$emit('bv::toggle::collapse', 'sidebarFilter');
    },
    formatObjType(type) {
      const types = {
        income: { name: this.translate(type), color: 'success' },
        expense: { name: this.translate(type), color: 'danger' },
        transfer: { name: this.translate(type), color: 'dark' }
      };

      return types[type];
    },
    ...mapActions(['setFilters']),
    ...mapActions('transactions', ['indexTransactions']),
    ...mapActions('categories', ['indexCategories'])
  }
};
