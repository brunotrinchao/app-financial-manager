import { mapActions, mapGetters, mapState } from 'vuex';
import { EventBus } from '@/event-bus';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
export default {
  name: 'formAccount',
  mixins: [StrHelpMixin],
  props: {
    items: {
      type: Object
    }
  },
  data() {
    return {
      bank: null,
      form: {
        id: null,
        name: null,
        bank_id: null,
        balance: 0
      }
    };
  },
  watch: {
    bank: {
      handler(newVal) {
        this.form.bank_id = newVal.id;
      }
    }
  },
  computed: {
    validations() {
      return [{ model: 'name', name: 'Nome', condition: this.form.name == null }];
    },
    getBanks() {
      const banks = Array.isArray(this.settings?.banks) ? this.settings?.banks : [];
      return [
        { value: null, text: 'Selecione' },
        ...banks.map((el) => {
          return { value: el, text: el.name };
        })
      ];
    },
    ...mapState(['settings']),
    ...mapGetters('accounts', ['accountById'])
  },
  mounted() {
    this.fillForm();
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      let idModal = 'modalform';
      if (this.validateFields(this.form, this.validations)) {
        if (this.form.id) {
          idModal = 'formEditAccounts';
          await this.updateAccounts({ id: this.form.id, params: this.form });
        } else {
          await this.storeAccounts(this.form);
        }
        EventBus.$emit('update-list');
        setTimeout(() => {
          this.$modalManager.hide(idModal);
        }, 300);
      }
    },
    fillForm() {
      const itemSelected = this.accountById(this.items.id);
      if (itemSelected) {
        this.form.id = itemSelected.id;
        this.form.name = itemSelected.name;
        this.bank = itemSelected.bank;
        this.form.balance = itemSelected.balance;
      }
    },
    ...mapActions('accounts', ['indexAccounts', 'storeAccounts', 'updateAccounts'])
  }
};
