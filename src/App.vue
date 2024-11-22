<template>
  <div id="app" :class="['app', { 'logged-in': isAuthenticated }]">
    <Preloader />
    <Fab v-if="isAuthenticated" />
    <Header v-if="isAuthenticated" />
    <div class="container-fluid">
      <Titlebar title="teste" v-if="isAuthenticated" />
      <div id="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Header, Titlebar, Preloader, Fab } from '@/components';
export default {
  name: 'App',
  components: {
    Header,
    Titlebar,
    Preloader,
    Fab
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  created() {
    this.$root.$on('auth-updated', async () => {
      await this.indexSettings();
    });
    this.$router.afterEach((to) => {
      document.title = to.meta.title || '';
    });
  },
  async beforeMount() {
    if (!this.isAuthenticated) {
      this.checkAuthentication();
    }
  },
  async mounted() {
    if (this.isAuthenticated) {
      setTimeout(async () => {
        await this.indexSettings();
      }, 500);
    }
  },
  methods: {
    ...mapActions(['indexSettings', 'checkAuthentication'])
  }
};
</script>

<style lang="scss">
html {
  background-color: #e6e5e5;
}
#app {
  background-color: #e6e5e5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app.logged-in {
  padding-top: 95px;
}

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
