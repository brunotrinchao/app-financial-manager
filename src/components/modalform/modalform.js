import { EventBus } from '@/event-bus';

export default {
  name: 'ModalForm',
  props: {
    title: {
      type: String,
      default: 'Modal'
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        const validSizes = ['xl', 'lg', 'md', 'sm'];
        return validSizes.includes(value);
      }
    },
    component: null,
    selectedItem: null
  },
  data() {
    return {};
  },
  mounted() {
    EventBus.$on('close-all-modals', () => {
      this.$refs['modalForm'].hide();
    });
    this.$root.$on('bv::modal::hide', () => {
      this.resetModal();
    });
  },
  beforeDestroy() {
    EventBus.$off('close-all-modals'); // Evita vazamento de memória
  },

  methods: {
    clickHandler(item) {
      this.resetModal();
      this.selectedComponent = item.component; // Nome do componente a renderizar
      this.selectedItem = item; // Dados do item selecionado (se necessário)
      this.modalTitle = item.name; // Define o título do modal
      setTimeout(() => {
        this.$bvModal.show('formAdd');
      }, 500);
      // this.$router.push({ path: item.link });
    },
    resetModal() {
      (this.selectedComponent = null), (this.selectedItem = null), (this.modalTitle = null);
    }
  }
};
