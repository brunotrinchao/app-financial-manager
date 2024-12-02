import { mapActions } from 'vuex';
import DateRangePicker from 'vue2-daterange-picker';
export default {
  name: 'CpDaterangepicker',
  components: { DateRangePicker },
  data() {
    return {
      dateRange: {
        startDate: this.$moment().startOf('day'),
        endDate: this.$moment().endOf('day')
      },
      locale: {
        format: 'dd/mm/yyyy',
        separator: ' - ',
        applyLabel: 'Aplicar',
        cancelLabel: 'Cancelar',
        weekLabel: 'S',
        customRangeLabel: 'Personalizado',
        daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        monthNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        firstDay: 0
      }
    };
  },
  computed: {
    objRanges() {
      const today = this.$moment().startOf('day').toDate();

      return {
        Hoje: [today, today],
        Amanhã: [this.$moment().add('1', 'day').toDate(), this.$moment().add('1', 'day').toDate()],
        'Esta semana': [this.$moment().startOf('week').toDate(), this.$moment().endOf('week').toDate()],
        // 'Última semana': [this.$moment().subtract(1, 'week').startOf('week').toDate(), this.$moment().subtract(1, 'week').endOf('week').toDate()],
        'Este mês': [this.$moment().startOf('month').toDate(), this.$moment().endOf('month').toDate()],
        'Mês anterior': [this.$moment().subtract(1, 'month').startOf('month').toDate(), this.$moment().subtract(1, 'month').endOf('month').toDate()],
        'Últimos 3 meses': [this.$moment().subtract(2, 'months').startOf('month').toDate(), this.$moment().endOf('month').toDate()],
        'Últimos 6 meses': [this.$moment().subtract(5, 'months').startOf('month').toDate(), this.$moment().endOf('month').toDate()],
        'Este ano': [this.$moment().startOf('year').toDate(), this.$moment().endOf('year').toDate()]
      };
    }
  },
  mounted() {
    this.setFilters([{ period: this.dateRange }]);
  },
  methods: {
    updateValues(value) {
      const period = {
        startDate: this.$moment(value.startDate),
        endDate: this.$moment(value.endDate)
      };
      this.setFilters([{ period }]);
    },
    formatDateRange(dates) {
      let startDate = dates.startDate;
      let endDate = dates.endDate;
      const today = this.$moment().startOf('day');
      const tomorrow = this.$moment().startOf('day').add(1, 'day');
      const thisWeekStart = today.clone().startOf('week');
      const thisWeekEnd = today.clone().endOf('week');
      const lastWeekStart = today.clone().subtract(1, 'weeks').startOf('week');
      const lastWeekEnd = lastWeekStart.clone().endOf('week');
      const thisMonthStart = today.clone().startOf('month');
      const thisMonthEnd = today.clone().endOf('month');
      const lastMonthStart = today.clone().subtract(1, 'months').startOf('month');
      const lastMonthEnd = lastMonthStart.clone().endOf('month');
      const threeMonthsStartAgo = today.clone().subtract(2, 'months').startOf('month');
      const sixMonthsAgo = today.clone().subtract(5, 'months').startOf('month');
      const thisYearStart = today.clone().startOf('year');
      const thisYearEnd = today.clone().endOf('year');

      if (this.$moment(startDate).isSame(today, 'day') && this.$moment(endDate).isSame(today, 'day')) {
        return 'Hoje';
      } else if (this.$moment(startDate).isSame(tomorrow, 'day') && this.$moment(endDate).isSame(tomorrow, 'day')) {
        return 'Amanhã';
      } else if (this.$moment(startDate).isSame(thisWeekStart, 'day') && this.$moment(endDate).isSame(thisWeekEnd, 'day')) {
        return 'Esta semana';
      } else if (this.$moment(startDate).isSame(lastWeekStart, 'day') && this.$moment(endDate).isSame(lastWeekEnd, 'day')) {
        return 'Última semana';
      } else if (this.$moment(startDate).isSame(thisMonthStart, 'day') && this.$moment(endDate).isSame(thisMonthEnd, 'day')) {
        return 'Esse mês';
      } else if (this.$moment(startDate).isSame(lastMonthStart, 'day') && this.$moment(endDate).isSame(lastMonthEnd, 'day')) {
        return 'Mês anterior';
      } else if (this.$moment(startDate).isSame(threeMonthsStartAgo, 'day') && this.$moment(endDate).isSame(thisMonthEnd, 'day')) {
        return 'Últimos 3 meses';
      } else if (this.$moment(startDate).isSame(sixMonthsAgo, 'day') && this.$moment(endDate).isSame(thisMonthEnd, 'day')) {
        return 'Últimos 6 meses';
      } else if (this.$moment(startDate).isSame(thisYearStart, 'day') && this.$moment(endDate).isSame(thisYearEnd, 'day')) {
        return 'Este ano';
      } else {
        // Formato padrão se não for nenhum dos intervalos conhecidos
        return `${this.$moment(startDate).format('DD/MM/YYYY')} - ${this.$moment(endDate).format('DD/MM/YYYY')}`;
      }
    },
    ...mapActions(['setFilters'])
  }
};
