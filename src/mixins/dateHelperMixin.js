export default {
  startOfDay(date) {
    console.log('chegou');
    date.setHours(0, 0, 0, 0);
    return date;
  },
  endOfDay(date) {
    date.setHours(23, 59, 59, 999);
    return date;
  },
  startOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para domingo como início da semana
    return this.startOfDay(new Date(date.setDate(diff)));
  },
  endOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + 7;
    return this.endOfDay(new Date(date.setDate(diff)));
  },
  startOfMonth(date) {
    return this.startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
  },
  endOfMonth(date) {
    return this.endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  },
  startOfYear(date) {
    return this.startOfDay(new Date(date.getFullYear(), 0, 1));
  },
  endOfYear(date) {
    return this.endOfDay(new Date(date.getFullYear(), 11, 31));
  },
  subtractWeeks(date, weeks) {
    return new Date(date.setDate(date.getDate() - 7 * weeks));
  },
  subtractMonths(date, months) {
    date.setMonth(date.getMonth() - months);
    return date;
  },
  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  },
  formatDate(date) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }
};
