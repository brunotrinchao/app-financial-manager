import { mapActions, mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
export default {
  name: 'formCategory',
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
        name: null
      }
    };
  },
  computed: {
    validations() {
      return [{ model: 'name', name: 'Nome', condition: this.form.name == null }];
    },
    ...mapGetters('categories', ['categoryById'])
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
          idModal = 'formEditCategories';
          await this.updateCategories({ id: this.form.id, params: this.form });
        } else {
          await this.storeCategories(this.form);
        }
        EventBus.$emit('update-list');
        setTimeout(() => {
          this.$modalManager.hide(idModal);
        }, 300);
      }
    },
    fillForm() {
      const itemSelected = this.categoryById(this.items.id);

      if (itemSelected) {
        this.form.id = itemSelected.id;
        this.form.name = itemSelected.name;
      }
    },
    ...mapActions('categories', ['indexCategories', 'storeCategories', 'updateCategories'])
  }
};
