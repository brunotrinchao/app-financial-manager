import { Indicators, Table, Chart } from '@/components';
import { mapActions, mapState } from 'vuex';
import StrHelpMixin from '@/mixins/strHelpMixin.js';

export default {
  name: 'Dashboard',

  mixins: [StrHelpMixin],

  components: {
    Indicators,
    Table,
    Chart
  },

  data() {
    return {
      indicatorsArr: [],
      fields: [
        { label: 'Data', key: 'transaction_date', sortable: true },
        { label: 'Usuário', key: 'user', sortable: true },
        { label: 'Categoria', key: 'category', sortable: true },
        { label: 'Tipo', key: 'type', sortable: true },
        { label: 'Metodo', key: 'method', sortable: true },
        { label: 'Valor', key: 'value', sortable: true },
        { label: 'Status', key: 'status', sortable: true }
      ],
      items: [],
      perPage: 5,
      currentPage: 1,
      chartoptions: {
        chart: {
          width: 580,
          height: 550,
          type: 'pie'
        },
        labels: [],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      },
      series: [],
      chartCategoryOptions: {
        options: {
          labels: [],
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        },
        series: []
      },
      chartCardsOptions: {
        options: {
          labels: [],
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        },
        series: []
      },
      chartCreditCardsOptions: {
        options: {
          labels: [],
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        },
        series: []
      }
    };
  },
  watch: {
    filters: {
      async handler() {
        await this.fetchIndicators();
        await this.fetchChat();
        await this.fetchTransactions();
      },
      // immediate: true,
      deep: true
    }
  },
  computed: {
    rows() {
      return this.items.length;
    },
    getLegends() {
      return this.showLegendas();
    },
    ...mapState(['filters'])
  },
  async mounted() {
    await this.fetchIndicators();
    await this.fetchChat();
    await this.fetchTransactions(1);
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async fetchIndicators() {
      const startDate = this.filters?.period?.startDate ? this.filters.period.startDate.format('YYYY-MM-DD') : null;

      const endDate = this.filters?.period?.endDate ? this.filters.period.endDate.format('YYYY-MM-DD') : null;

      const params = {
        date: { startDate, endDate }
      };

      delete params.period;

      const response = await this.indexIndicators(params);
      this.indicatorsArr = [];

      Object.keys(response).forEach((el) => {
        this.indicatorsArr.push({
          title: this.statusIndicatorColor(el).title,
          value: response[el].amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          total: response[el].total,
          color: `bg-${this.statusIndicatorColor(el).color}`,
          icon: 'calendar-check'
        });
      });
    },
    async fetchChat() {
      const startDate = this.filters?.period?.startDate ? this.filters.period.startDate.format('YYYY-MM-DD') : null;

      const endDate = this.filters?.period?.endDate ? this.filters.period.endDate.format('YYYY-MM-DD') : null;

      const params = {
        date: { startDate, endDate }
      };

      delete params.period;

      const responseCategory = await this.indexChart({ url: 'category', params });

      this.chartCategoryOptions.options.labels = [];
      this.chartCategoryOptions.series = [];
      if (responseCategory.length) {
        responseCategory.forEach((el) => {
          this.chartCategoryOptions.options.labels.push(el.name);
          this.chartCategoryOptions.series.push(el.percentage);
        });
      } else {
        this.chartCategoryOptions.options.labels.push('Sem dados');
        this.chartCategoryOptions.series.push(100);
      }

      const responseCards = await this.indexChart({ url: 'credit-cards', params });

      this.chartCreditCardsOptions.options.labels = [];
      this.chartCreditCardsOptions.series = [];
      if (responseCards.length) {
        responseCards.forEach((el) => {
          this.chartCreditCardsOptions.options.labels.push(el.name);
          this.chartCreditCardsOptions.series.push(el.percentage);
        });
      } else {
        this.chartCreditCardsOptions.options.labels.push('Sem dados');
        this.chartCreditCardsOptions.series.push(100);
      }
    },
    statusIndicatorColor(color) {
      const colors = {
        pending: {
          color: 'warning',
          title: 'Contas pendentes'
        },
        scheduled: { color: 'info', title: 'Contas agendadas' },
        paid: { color: 'success', title: 'Contas pagas' },
        overdue: { color: 'danger', title: 'Contas vencidas' }
      };

      return colors[color] || color;
    },
    async fetchTransactions(page) {
      page = page ?? 1;
      const startDate = this.filters?.period?.startDate ? this.filters.period.startDate.format('YYYY-MM-DD') : null;

      const endDate = this.filters?.period?.endDate ? this.filters.period.endDate.format('YYYY-MM-DD') : null;

      const params = {
        page,
        per_page: this.perPage,
        orderBy: {
          field: 'transaction_date',
          orderBy: 'DESC'
        },
        date: { startDate, endDate }
      };

      delete params.period;

      const response = await this.indexTransactions(params);

      if (response?.items?.length > 0) {
        this.items = this.formatItems(response.items);
        this.paginate = response.paginate;
      }
      console.log({ items: this.items, paginate: this.paginate });
      return { items: this.items, paginate: this.paginate };
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
    formatItems(itens) {
      return itens.map((el) => {
        const amount = el.type === 'expense' ? -Math.abs(el.amount) : Math.abs(el.amount);
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
          value: amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          typeName: this.translate(el?.type),
          status: this.formatStatus(el?.status),
          user: { name: el?.user.name, avatar: el?.user.avatar, text: this.getInitials(el?.user.name) }
        };
      });
    },
    ...mapActions('transactions', ['indexTransactions']),
    ...mapActions('dashboard', ['indexIndicators', 'indexChart'])
  }
};
