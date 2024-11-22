import { mapActions } from 'vuex';

export default {
  name: 'AuthCallback',
  data() {
    return {};
  },
  mounted() {
    const ret = this.$route.query.ret;
    if (ret) {
      console.log(JSON.parse(ret));
      this.setAuth(JSON.parse(ret));

      this.$router.push({ name: 'dashboard' });
    } else {
      // Tratar erro de autenticação
      alert('Falha na autenticação.');
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    ...mapActions(['setAuth'])
  }
};
