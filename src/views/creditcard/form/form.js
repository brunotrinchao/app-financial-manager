import { mapActions, mapGetters, mapState } from 'vuex';
import { EventBus } from '@/event-bus';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
export default {
  name: 'formCreditCard',
  mixins: [StrHelpMixin],
  props: {
    items: {
      type: Object
    }
  },
  data() {
    return {
      issuer: null,
      form: {
        id: null,
        name: null,
        issuer_id: null,
        limit: 0,
        available_limit: 0
      }
    };
  },
  watch: {
    issuer: {
      handler(newVal) {
        this.form.issuer_id = newVal;
      }
    }
  },
  computed: {
    validations() {
      return [{ model: 'name', name: 'Nome', condition: this.form.name == null }];
    },
    getFlagsList() {
      const issuer = Array.isArray(this.settings?.issuer) ? this.settings?.issuer : [];
      return [
        { value: null, text: 'Selecione' },
        ...issuer.map((el) => {
          return { value: el.id, text: el.name };
        })
      ];
    },
    ...mapState(['settings']),
    ...mapGetters('creditcards', ['creditcardById'])
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
          idModal = 'formEditCreditCards';
          await this.updateCreditCards({ id: this.form.id, params: this.form });
        } else {
          await this.storeCreditCards(this.form);
        }
        EventBus.$emit('update-list');
        setTimeout(() => {
          this.$modalManager.hide(idModal);
        }, 300);
      }
    },
    fillForm() {
      const itemSelected = this.creditcardById(this.items.id);
      if (itemSelected) {
        this.form = itemSelected;
        this.issuer = itemSelected.issuer.id;
      }
    },
    ...mapActions('creditcards', ['indexCreditCards', 'storeCreditCards', 'updateCreditCards'])
  }
};
