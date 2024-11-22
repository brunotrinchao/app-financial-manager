import { mapActions } from 'vuex';

export default {
  name: 'Logout',
  data() {
    return {};
  },
  mounted() {
    this.logout();
    this.$router.push({ name: 'login' });
  },
  methods: {
    ...mapActions(['logout'])
  }
};
