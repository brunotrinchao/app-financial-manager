import { mapState } from 'vuex';
import { EventBus } from '@/event-bus';
import ModalForm from '@/components/modalform';

export default {
  name: 'Fab',
  components: { ModalForm },
  data() {
    return {
      selectedComponent: null,
      selectedItem: null,
      modalTitle: ''
    };
  },

  computed: {
    menuFieltered() {
      return this.menu.filter((el) => el.add);
    },
    ...mapState(['menu'])
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
      this.selectedComponent = item.form.component; // Nome do componente a renderizar
      this.selectedItem = item; // Dados do item selecionado (se necessário)
      this.modalTitle = item.form.title ?? item.name; // Define o título do modal

      this.$modalManager.show({
        id: item.form.id ?? 'modalform',
        title: this.modalTitle,
        size: item.form.size ?? 'md',
        component: this.selectedComponent, // Nome do componente Vue
        selectedItem: this.selectedItem // Dados passados para o componente
      });

      // this.$router.push({ path: item.link });
    },
    resetModal() {
      (this.selectedComponent = null), (this.selectedItem = null), (this.modalTitle = null);
    }
  }
};
