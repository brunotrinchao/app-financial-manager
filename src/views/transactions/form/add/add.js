import { mapActions, mapState, mapGetters } from 'vuex';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
import { EventBus } from '@/event-bus';
import Form from '../index.vue';
export default {
  name: 'formAdd',
  props: {
    items: {
      type: Object
    }
  },
  components: { Form },
  mixins: [StrHelpMixin],
  data() {
    return {
      source: {},
      form: {
        id: null,
        category_id: null,
        type: null,
        method: null,
        amount: 0,
        description: '',
        transaction_date: this.$moment().toDate(),
        source_id: null,
        source_type: null,
        frequency: null,
        interval: 1,
        status: null
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
  watch: {
    source: {
      handler(newVal) {
        this.form.source_id = newVal.id;
        this.form.source_type = newVal.type.toLowerCase();
      }
    },
    'form.method': {
      handler(newVal, oldVal) {
        if (this.form.type == 'expense' && newVal != oldVal) {
          this.source = {};
          this.form.source_id = null;
          this.form.source_type = null;
        }
      }
    }
  },
  computed: {
    validations() {
      return [
        { model: 'type', name: 'Tipo de transação', condition: this.form.type == null },
        { model: 'category_id', name: 'Categoria', condition: this.form.type !== null && this.form.category == null },
        { model: 'method', name: `Método de ${this.form.type == 'income' ? 'recebimento' : 'pagamento'}`, condition: this.form.type !== null },
        { model: 'amount', name: 'Valor', condition: this.form.type !== null && this.form.amount == 0 },
        { model: 'transaction_date', name: 'Data da transação', condition: this.form.type !== null },
        { model: 'source_id', name: 'Fonte', condition: this.form.method !== null && this.form.source_id == null },
        { model: 'frequency', name: 'Frequência', condition: this.form.interval > 1 && this.form.type === 'expense' },
        { model: 'interval', name: 'Parcelas', condition: this.form.type === 'expense' }
      ];
    },
    getCategories() {
      const categories = Array.isArray(this.categories) ? this.categories : [];
      return [
        { value: null, text: 'Selecione' },
        ...categories.map((el) => {
          return { value: el.id, text: el.name };
        })
      ];
    },
    getTypes() {
      const type = Array.isArray(this.settings?.type) ? this.settings?.type : [];

      return [
        { value: null, text: 'Selecione' },
        ...type.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getMethods() {
      const method = Array.isArray(this.settings?.method) ? this.settings?.method : [];
      return [
        { value: null, text: 'Selecione' },
        ...method.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getSources() {
      const source = this.settings?.source ?? [];
      return source;
    },
    getSourcesAccount() {
      const source = this.settings?.source ?? [];
      const list = ['account', 'pix', 'debit_card'].includes(this.form.method) ? source.account : source.creditCard;
      const souce_type = ['account', 'pix', 'debit_card'].includes(this.form.method) ? 'account' : 'credit_card';
      return [
        { value: null, type: 'Selecione' },
        ...list.map((el) => {
          const flag = el.bank ? el.bank : el.issuer;
          return { value: el.id, type: el.name + ' - ' + flag.name, souce_type };
        })
      ];
    },
    getFrequency() {
      const frequency = Array.isArray(this.settings?.frequency) ? this.settings?.frequency : [];
      return [
        { value: null, text: 'Selecione' },
        ...frequency.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getStatus() {
      const status = Array.isArray(this.settings?.status) ? this.settings?.status : [];
      return [
        { value: null, text: 'Selecione' },
        ...status.map((el) => {
          return { value: el, text: this.translate(el) };
        })
      ];
    },
    getParcelas() {
      return !this.form.id && this.form.interval > 1
        ? `Valor da parcela: ${this.formatCurrency(this.form.amount / this.form.interval)}`
        : this.form.id && this.form.installment && this.form.interval > 1
        ? `Valor da parcela - ${this.form.installment}/${this.form.interval}`
        : 'Pagamento único';
    },
    ...mapState(['settings']),
    ...mapState('categories', ['categories']),
    ...mapGetters('transactions', ['selecionado']),
    ...mapGetters('categories', ['_categoryByName'])
  },

  async beforeMount() {
    await this.indexCategories();
  },

  mounted() {
    this.fillForm();
    // console.log({ items: this.items });
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
      let idModal = 'modalform';
      if (this.validateFields(this.form, this.validations)) {
        if (this.form.id) {
          idModal = 'formEditTransaction';
          await this.updateTransactions({ id: this.form.id, params: this.form });
        } else {
          await this.storeTransactions(this.form);
        }
        EventBus.$emit('update-list');
        setTimeout(() => {
          this.$modalManager.hide(idModal);
        }, 300);
      }
    },
    fillForm() {
      const itemSelected = this.selecionado(this.items.id);
      if (itemSelected) {
        this.form.id = itemSelected.id;
        this.form.category_id = itemSelected.category.id;
        this.form.type = itemSelected.type;
        this.form.method = itemSelected.method;
        this.form.amount = itemSelected.amount;
        this.form.description = itemSelected.description;
        this.form.transaction_date = itemSelected.transaction_date;
        this.form.frequency = itemSelected.frequency;
        this.form.interval = itemSelected.interval;
        this.form.installment = itemSelected.installment;
        this.form.status = itemSelected.status;

        if (itemSelected.source) {
          this.source = { id: itemSelected.source.id, type: itemSelected.source.type };
        }
      }
    },
    // TODO - Veridicar se pode remover o indexCategories e buscar no state
    ...mapActions('categories', ['indexCategories']),
    ...mapActions('transactions', ['storeTransactions', 'updateTransactions'])
  }
};
