import { mapActions, mapState, mapGetters } from 'vuex';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
import { EventBus } from '@/event-bus';

import IncomeForm from './types/income.vue';
import ExpenseForm from './types/expense.vue';
import TransferForm from './types/transfer.vue';

export default {
  name: 'formTransaction',
  props: {
    items: {
      type: Object
    }
  },
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
        transaction_date: this.$moment().startOf('day').format('YYYY-MM-DD'),
        source_id: null,
        source_type: null,
        frequency: null,
        interval: 1,
        status: null
      }
    };
  },
  components: {
    IncomeForm,
    ExpenseForm,
    TransferForm
  },
  computed: {
    validations() {
      console.log(this.form);
      return [
        { model: 'type', name: 'Tipo de transação', condition: this.form.type == null },
        { model: 'category_id', name: 'Categoria', condition: this.form.type !== null && this.form.category == null },
        { model: 'method', name: `Método de ${this.form.type == 'income' ? 'recebimento' : 'pagamento'}`, condition: this.form.type !== null },
        { model: 'amount', name: 'Valor', condition: this.form.type !== null && this.form.amount == 0 },
        { model: 'transaction_date', name: 'Data da transação', condition: this.form.type !== null },
        { model: 'source_id', name: 'Fonte', condition: this.form.method !== null && this.form.source_id == null && this.form.method == 'transfer' },
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
      const source_type = ['account', 'pix', 'debit_card'].includes(this.form.method) ? 'account' : 'credit_card';
      console.log({ list });
      return [
        { value: null, type: 'Selecione', source_type: null },
        ...list.map((el) => {
          const flag = el.bank ? el.bank : el.issuer;
          return { value: el.id, type: el.name + ' - ' + flag.name, source_type };
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
  beforeMount() {
    this.fillForm();
  },
  async mounted() {
    await this.indexCategories();

    EventBus.$on('update-form-transaction', (val) => {
      this.fillFormTypes(val);
    });
  },
  methods: {
    getComponent(type) {
      if (type == 'transfer') {
        this.form.method = 'account';
      }

      switch (type) {
        case 'income':
          return 'IncomeForm';
        case 'expense':
          return 'ExpenseForm';
        case 'transfer':
          return 'TransferForm';
        default:
          return type;
      }
    },
    handleTypeChange() {
      this.resetForm();
      this.$emit('resetForm');
    },
    // onSubmit(event) {
    //   event.preventDefault();
    //   console.log(this.$refs);
    //   EventBus.$emit('update-list');
    //   this.$emit('submitForm');
    // },
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
          this.form.transaction_date = this.$moment(this.form.transaction_date).format('YYYY-MM-DD');
          console.log(this.form);
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

      console.log({ itemSelected });
      if (itemSelected) {
        this.form.id = itemSelected.id;
        this.form.category_id = itemSelected.category.id;
        this.form.type = itemSelected.type;
        this.form.method = itemSelected.method;
        this.form.amount = itemSelected.amount;
        this.form.description = itemSelected.description;
        this.form.transaction_date = itemSelected.transaction_date.format('YYYY-MM-DD');
        this.form.frequency = itemSelected.frequency;
        this.form.interval = itemSelected.interval;
        this.form.installment = itemSelected.installment;
        this.form.status = itemSelected.status;

        if (itemSelected.source) {
          this.form.source_id = itemSelected.source.id;
          this.form.source_type = itemSelected.source.type;
        }
      }
    },
    resetForm() {
      this.form.method = null;
      this.form.amount = 0;
      this.form.description = '';
      this.form.transaction_date = this.$moment().toDate();
      this.form.source_id = null;
      this.form.source_type = null;
      this.form.source = {};
      this.form.frequency = null;
      this.form.interval = 1;
      this.form.status = null;
    },
    fillFormTypes(val) {
      Object.keys(val).forEach((element) => {
        this.form[element] = val[element];
      });
    },
    ...mapActions('categories', ['indexCategories']),
    ...mapActions('transactions', ['storeTransactions', 'updateTransactions'])
  }
};
