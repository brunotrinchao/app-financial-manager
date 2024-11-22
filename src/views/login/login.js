import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: 'brunotrinchao@gmail.com',
        password: '12345678'
      },
      loading: false
    };
  },

  methods: {
    async handleLogin() {
      await this.login(this.form);

      if (sessionStorage.getItem(process.env.VUE_APP_SESSION_KEY)) {
        this.$root.$emit('auth-updated', true);
        this.$router.push({ name: 'dashboard' });
      }
    },
    async handleLoginGoogle() {
      // await this.loginGoogle();
      window.location.href = `${process.env.VUE_APP_API_URL}/api/auth/google/redirect`;

      // if (sessionStorage.getItem(process.env.VUE_APP_SESSION_KEY)) {
      //   this.$root.$emit('auth-updated', true);
      //   this.$router.push({ name: 'dashboard' });
      // }
    },
    ...mapActions(['login', 'loginGoogle'])
  }
};
