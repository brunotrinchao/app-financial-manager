import { mapGetters, mapState, mapActions } from 'vuex';
import { EventBus } from '@/event-bus';

export default {
  name: 'Transactions',
  data() {
    return {
      fields: [
        { label: 'Data', key: 'date' },
        { label: 'Categoria', key: 'category' },
        { label: 'Tipo', key: 'type' },
        { label: 'Metodo', key: 'method' },
        { label: 'Valor', key: 'value' },
        { lavel: 'Status', key: 'status' }
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
      handler(newVal) {
        this.formatFilter(newVal);
        this.fetchTransactions(this.currentPage);
      },
      deep: true
    },
    pagination: {
      handler(newVal) {
        // this.currentPage = newVal.current_page;
        this.totalPage = newVal.total;
      },
      immediate: true,
      deep: true
    },
    currentPage: {
      handler: (newVal) => {
        console.log(newVal);
        this.fetchTransactions(newVal);
      }
    }
  },

  computed: {
    ...mapState(['filters']),
    ...mapGetters('transactions', ['pagination'])
  },

  async mounted() {
    EventBus.$on('update-list', async () => {
      await this.fetchTransactions();
    });
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
    onReset() {
      return true;
    },
    async formatFilter(filters) {
      // Função para formatar o período
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

          return {
            text: this.translateFilterKey(key),
            value: value ?? null // Garantia de que value nunca seja undefined
          };
        })
        .filter((item) => item.value !== null); // Filtra apenas os valores válidos
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
      Object.keys(filter).forEach((el) => {
        if (filter[el]) {
          this.setFilters({ [el]: filter[el] });
        }
      });

      // this.setFilters({ period: value });
    },
    formatItems() {
      this.items = this.transactions.map((el) => {
        return {
          id: el.id,
          date: this.$moment(el.transaction_date).format('DD/MM/YYYY'),
          category: el.category.name,
          type: el.type === 'income' ? 'arrow-up-circle-fill' : 'arrow-down-circle-fill',
          method: el.method,
          value: el.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          status: this.formatStatus(el.status),
          typeName: this.formatType(el.type)
        };
      });
    },
    formatStatus(status) {
      switch (status) {
        case 'pending':
          return { name: 'Pendente', color: 'warning' };
        case 'scheduled':
          return { name: 'Agendado', color: 'info' };
        case 'canceled':
          return { name: 'Cancelado', color: 'secondary' };
        case 'overdue':
          return { name: 'Vencido', color: 'danger' };
        case 'paid':
          return { name: 'Pago', color: 'success' };
        default:
          break;
      }
    },
    formatType(type) {
      return type === 'income' ? 'Entrada' : 'Saída';
    },
    async fetchTransactions(page) {
      console.log(this.filters);
      page = page ?? 1;
      let filtersFormated = this.filters;
      filtersFormated.period.startDate = filtersFormated.period?.startDate?.format('YYYY-MM-DD');
      filtersFormated.period.endDate = filtersFormated.period?.endDate?.format('YYYY-MM-DD');
      this.transactions = await this.indexTransactions({
        page: page,
        per_page: this.perPage,
        ...filtersFormated
      });

      this.formatItems();

      this.$root.$emit('bv::refresh::table', 'table-transactions');
    },
    ...mapActions(['setFilters']),
    ...mapActions('transactions', ['indexTransactions'])
  }
};
