import { EventBus } from '@/event-bus';
import StrHelpMixin from '@/mixins/strHelpMixin.js';

export default {
  name: 'Table',

  mixins: [StrHelpMixin],
  props: {
    tableId: {
      type: String,
      required: true
    },
    apiMethod: {
      type: Function,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    initialPage: {
      type: Number,
      default: 1
    },
    paginationShow: {
      type: Boolean,
      default: true
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      items: [],
      totalRows: 0,
      currentPage: this.initialPage,
      sortBy: null,
      sortDesc: false
    };
  },
  watch: {
    currentPage: 'fetchData',
    sortBy: 'fetchData',
    sortDesc: 'fetchData'
  },
  mounted() {
    this.fetchData();
    EventBus.$on('update-list', () => {
      this.refreshTable();
    });
    console.group({ smal: this.small });
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.apiMethod(this.currentPage);
        this.items = Array.isArray(response.items) ? response.items : [];
        this.totalRows = response.paginate?.total || 0;
        console.log(this.items);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.items = [];
        this.totalRows = 0;
      }
    },
    refreshTable() {
      this.fetchData();
    },
    onRowSelected(row) {
      this.$emit('row-selected', row);
    },
    sort(field) {
      if (this.sortBy === field) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortBy = field;
        this.sortDesc = false;
      }

      this.fetchData();
    },
    getAvatar(img) {
      return img ?? 'https://placekitten.com/300/300';
    },
    formatText(key, text) {
      let icon;
      try {
        icon = require(`@/assets/imgs/${key}/${text}.svg`);
      } catch (error) {
        icon = '';
      }

      return {
        name: this.translate(text),
        icon: icon
      };
    }
  }
};
