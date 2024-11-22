import { mapActions } from 'vuex';
import DateRangePicker from 'vue2-daterange-picker';
export default {
  name: 'CpDaterangepicker',
  components: { DateRangePicker },
  data() {
    return {
      dateRange: {
        startDate: this.$moment().startOf('month'),
        endDate: this.$moment()
      }
      // locale: 'pt-BR',
      // hideHeader: true,
      // dateFormatOptions: { year: 'numeric', month: 'numeric', day: 'numeric' },
      // label: {
      //   NextMonth: 'Próximo mês',
      //   NextYear: 'Próximo ano',
      //   NoDateSelected: 'Data não selecionada',
      //   PrevMonth: 'Mês anterior',
      //   PrevYear: 'Ano anterior',
      //   Selected: 'Selecionado',
      //   Today: 'Hoje',
      //   CurrentMonth: 'Mês atual',
      //   Help: 'Use as teclas para navegar pelas datas do calendário'
      // },
      // form: {
      //   startDate: this.$moment().startOf('month').toDate(),
      //   endDate: this.$moment().toDate()
      // }
    };
  },
  watch: {
    // dateRange: {
    //   handler() {
    //     this.updateValues();
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  computed: {},
  methods: {
    updateValues(value) {
      console.log({ period: value });
      // this.setFilters({ period: value });
    },
    ...mapActions(['setFilters'])
  }
};
