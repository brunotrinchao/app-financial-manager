import { mapState } from 'vuex';
// import { User } from '@/components';
export default {
  name: 'Header',
  // components: { User },
  data() {
    return {};
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
