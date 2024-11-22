import { mapActions, mapState } from 'vuex';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
import { EventBus } from '@/event-bus';

export default {
  name: 'formAdd',
  mixins: [StrHelpMixin],
  data() {
    return {
      form: {
        category_id: null,
        type: null,
        method: null,
        amount: 0,
        description: '',
        transaction_date: null,
        source_type: null,
        frequency: null,
        interval: 1
      },
      amountFormated: '',
      locale: 'pt-BR',
      hideHeader: true,
      dateFormatOptions: { year: 'numeric', month: 'numeric', day: 'numeric' },
      label: {
        NextMonth: 'Próximo mês',
        NextYear: 'Próximo ano',
        NoDateSelected: 'Data não selecionada',
        PrevMonth: 'Mês anterior',
        PrevYear: 'Ano anterior',
        Selected: 'Selecionado',
        Today: 'Hoje',
        CurrentMonth: 'Mês atual',
        Help: 'Use as teclas para navegar pelas datas do calendário'
      }
    };
  },

  computed: {
    validations() {
      return [
        { model: 'type', name: 'Tipo de transação', condition: this.form.type == null },
        { model: 'category_id', name: 'Categoria', condition: this.form.type !== null && this.form.category == null },
        { model: 'method', name: `Método de ${this.form.type == 'income' ? 'recebimento' : 'pagamento'}`, condition: this.form.type !== null },
        { model: 'amount', name: 'Valor', condition: this.form.type !== null && this.form.amount == 0 },
        { model: 'transaction_date', name: 'Data da transação', condition: this.form.type !== null },
        { model: 'source_type', name: 'Fonte', condition: this.form.type === 'income' },
        { model: 'frequency', name: 'Frequência', condition: this.form.interval > 1 && this.form.type === 'expense' },
        { model: 'interval', name: 'Parcelas', condition: this.form.type === 'expense' }
      ];
    },
    getCategories() {
      return [
        { value: null, text: 'Selecione' },
        ...this.categories?.map((el) => {
          return { value: el.id, text: el.name };
        })
      ];
    },
    getTypes() {
      return [
        { value: null, text: 'Selecione' },
        ...this.settings?.type?.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getMethods() {
      return [
        { value: null, text: 'Selecione' },
        ...this.settings?.method?.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getSources() {
      return [
        { value: null, text: 'Selecione' },
        ...this.settings?.source?.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getFrequency() {
      return [
        { value: null, text: 'Selecione' },
        ...this.settings?.frequency?.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getParcelas() {
      return this.form.interval > 1 ? `Valor da parcela: ${this.formatCurrency(this.form.amount / this.form.interval)}` : 'Pagamento único';
    },
    ...mapState(['settings']),
    ...mapState('categories', ['categories'])
  },

  async beforeMount() {
    await this.indexCategories();
  },

  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    },
    validateAmount(event) {
      // Permitir apenas números e um ponto/virgula (para decimais)
      const value = event.target.value.replace(/[^0-9.,]/g, '');
      this.form.amount = value;
    },
    async onSubmit(event) {
      event.preventDefault();
      if (this.validateFields(this.form, this.validations)) {
        console.log(this.form);
        const ret = await this.storeTransactions(this.form);
        console.log(ret);
        EventBus.$emit('close-all-modals');
        EventBus.emit('update-list');
      }
    },

    ...mapActions('categories', ['indexCategories']),
    ...mapActions('transactions', ['storeTransactions'])
  }
};
