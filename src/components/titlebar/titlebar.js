import DateRangePicker from '../daterangepicker';

export default {
  name: 'Titlebar',

  props: {
    // title: {
    //   type: String,
    //   required: true
    // }
  },

  components: { DateRangePicker },

  data() {
    return {
      dateRangePickerPages: ['lancamentos, dashboard']
    };
  },

  computed: {
    dateRangePickerShow() {
      return this.$route.meta.showDatePicker;
    }
  },

  methods: {
    toggleDatePicker() {
      this.$refs.dateRangePicker.openPicker();
    }
  }
};
