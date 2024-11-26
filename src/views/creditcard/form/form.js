import { mapActions, mapGetters } from 'vuex';
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
      form: {
        id: null,
        name: null,
        limit: 0,
        available_limit: 0
      }
    };
  },
  computed: {
    validations() {
      return [{ model: 'name', name: 'Nome', condition: this.form.name == null }];
    },
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
      console.log(itemSelected);

      if (itemSelected) {
        this.form = itemSelected;
      }
    },
    ...mapActions('creditcard', ['indexCreditCards', 'storeCreditCards', 'updateCreditCards'])
  }
};
