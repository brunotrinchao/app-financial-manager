import store from '@/store';

export default {
  install(Vue) {
    const ModalManager = {
      modals: [],

      show({ id = `modal-${Date.now()}`, title = 'Modal', size = 'md', component, selectedItem = null }) {
        if (!component) {
          console.error('O componente é obrigatório para o modal.');
          return;
        }

        const ModalComponent = Vue.extend({
          store,
          data() {
            return { title, size, component, selectedItem, id };
          },
          methods: {
            closeModal() {
              this.$destroy(); // Destroi o componente
              document.getElementById(this.id)?.remove(); // Remove o elemento DOM
            }
          },
          mounted() {
            this.$nextTick(() => {
              // Mostra o modal após a montagem
              this.$bvModal.show(this.id);
            });
          },
          render(h) {
            return h(
              'b-modal',
              {
                props: {
                  id: this.id,
                  title: this.title,
                  size: this.size,
                  hideFooter: true
                },
                on: {
                  // ok: this.onOk || (() => {}), // Handler padrão caso onOk não seja definido
                  // cancel: this.onCancel || (() => {}), // Handler padrão caso onCancel não seja definido
                  // hidden: this.closeModal
                  hidden: this.closeModal
                }
              },
              [
                h('component', {
                  props: { data: this.selectedItem, items: this.selectedItem },
                  is: this.component
                }),
                h('template', { slot: 'modal-footer' })
              ]
            );
          }
        });

        // Criar uma instância do componente
        const container = document.createElement('div');
        container.id = id;
        document.body.appendChild(container);

        const instance = new ModalComponent();
        instance.$mount(`#${id}`);

        // Adicionar o modal à lista de modais
        this.modals.push(instance);
      },

      hide(id) {
        // Localiza o modal pelo ID
        const modalIndex = this.modals.findIndex((modal) => modal.id === id);

        if (modalIndex !== -1) {
          const modalInstance = this.modals[modalIndex];

          // Fecha e remove o modal
          modalInstance.closeModal();
          this.modals.splice(modalIndex, 1); // Remove da lista de modais
        } else {
          console.warn(`Modal com ID '${id}' não encontrado.`);
        }
      }
    };

    // Adiciona o gerenciador ao Vue
    Vue.prototype.$modalManager = ModalManager;
  }
};
