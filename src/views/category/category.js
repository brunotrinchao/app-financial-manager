import { Table } from '@/components';
import { EventBus } from '@/event-bus';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Category',
  components: { Table },
  data() {
    return {
      items: [],
      perPage: 10,
      currentPage: null,
      totalPage: null,
      fields: [{ label: 'Nome', key: 'name' }],
      form: {
        name: ''
      }
    };
  },
  computed: {
    getItems() {
      return this.formatItems(this.categories);
    },
    ...mapGetters('categories', ['categories'])
  },
  async beforeMount() {
    await this.indexCategories();
  },
  async mounted() {
    EventBus.$on('update-list', async () => {
      await this.indexCategories();
    });
  },
  beforeDestroy() {
    EventBus.$off('update-list', this.indexCategories);
  },
  methods: {
    onRowSelected(items) {
      this.$modalManager.show({
        id: 'formEditCategories',
        title: 'Editar categoria',
        size: 'md',
        component: () => import('./form/index.vue'),
        selectedItem: items
      });
    },
    // async fetchCategories(page) {
    //   page = page ?? 1;

    //   const itemsArr = await this.indexCategories({
    //     page: page,
    //     per_page: this.perPage,
    //     orderBy: {
    //       field: 'transaction_date'
    //     }
    //   });

    //   if (itemsArr.length > 0) {
    //     this.items = this.formatItems(itemsArr);
    //     console.log(this.items);
    //   }

    //   // TODO - Corrigir paginação
    //   this.$nextTick(() => {
    //     this.$root.$emit('bv::refresh::table', 'table-categories');
    //   });
    // },
    formatItems(itemsArr) {
      return itemsArr.map((el) => {
        return {
          id: el.id,
          name: el.name
        };
      });
    },
    ...mapActions('categories', ['indexCategories'])
  }
};
