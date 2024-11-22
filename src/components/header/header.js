import { mapState } from 'vuex';
import { User } from '@/components';
export default {
  name: 'Header',
  components: { User },
  data() {
    return {
      // menu: [
      //   {
      //     name: 'Dashboard',
      //     icon: 'columns-gap',
      //     link: '/dashboard'
      //   },
      //   {
      //     name: 'Lançamentos',
      //     icon: 'bar-chart-steps',
      //     link: '/lancamentos'
      //   },
      //   {
      //     name: 'Categorias',
      //     icon: 'bookmarks-fill',
      //     link: '/categorias'
      //   },
      //   {
      //     name: 'Contas',
      //     icon: 'bank',
      //     link: '/contas'
      //   },
      //   {
      //     name: 'Cartões',
      //     icon: 'credit-card-2-black-fill',
      //     link: '/cartoes'
      //   }
      // ]
    };
  },

  computed: {
    getName() {
      return Object.keys(this.user) ? this.user.name : '';
    },
    getAvatar() {
      return Object.keys(this.user) ? this.user.avatar : '';
    },
    ...mapState(['menu', 'user'])
  }
};
