import api from '@/api/api';
import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './dashboard';
import transactions from './transactions';
import categories from './category';
import accounts from './account';
import creditcards from './creditcard';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      period: {
        startDate: null,
        endDate: null
      },
      category: null,
      type: null,
      method: null,
      status: null
    },
    menu: [
      {
        name: 'Dashboard',
        icon: 'columns-gap',
        link: '/dashboard',
        add: false
      },
      {
        name: 'Lançamentos',
        icon: 'bar-chart-steps',
        link: '/lancamentos',
        add: true,
        form: {
          component: () => import('@/views/transactions/form/index.vue'),
          title: 'Novo lançamento',
          size: 'md'
        }
      },
      {
        name: 'Categorias',
        icon: 'bookmarks',
        link: '/categorias',
        add: true,
        form: {
          component: () => import('@/views/category/form/index.vue'),
          title: 'Nova categoria',
          size: 'md'
        }
      },
      {
        name: 'Contas',
        icon: 'bank',
        link: '/contas',
        add: true,
        form: {
          component: () => import('@/views/account/form/index.vue'),
          title: 'Nova conta',
          size: 'md'
        }
      },
      {
        name: 'Cartões',
        icon: 'credit-card-2-back',
        link: '/cartoes',
        add: true,
        form: {
          component: () => import('@/views/creditcard/form/index.vue'),
          title: 'Novo cartão de crédito',
          size: 'md'
        }
      }
    ],
    settings: [],
    token: null,
    user: null
  },
  mutations: {
    SET_FILTERS(state, filters) {
      state.filters = { ...state.filters, ...filters };
    },
    SET_SETTINGS(state, settings) {
      state.settings = settings;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async indexSettings({ commit }, params) {
      return await api.obter('/settings', params).then((data) => {
        commit('SET_SETTINGS', data);
        return data;
      });
    },
    async login({ commit }, { email, password }) {
      return await api.inserir('/auth/login', { email, password }).then(({ data }) => {
        if (data.access_token) {
          commit('SET_TOKEN', data.access_token);
          commit('SET_USER', data.user);
          sessionStorage.setItem(process.env.VUE_APP_SESSION_KEY, data.access_token);
          sessionStorage.setItem(process.env.VUE_APP_SESSION_USER, JSON.stringify(data.user));
        }
        return data.data;
      });
    },
    async loginGoogle({ commit }) {
      return await api.obter('/auth/google/redirect', {}).then((data) => {
        if (data.access_token) {
          commit('SET_TOKEN', data.access_token);
          commit('SET_USER', data.user);
          sessionStorage.setItem(process.env.VUE_APP_SESSION_KEY, data.access_token);
          sessionStorage.setItem(process.env.VUE_APP_SESSION_USER, data.user);
        }
        return data.data;
      });
    },
    async logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
      sessionStorage.removeItem(process.env.VUE_APP_SESSION_KEY);
      sessionStorage.removeItem(process.env.VUE_APP_SESSION_USER);
    },
    checkAuthentication({ commit }) {
      const tokenSession = sessionStorage.getItem(process.env.VUE_APP_SESSION_KEY);
      const userSession = sessionStorage.getItem(process.env.VUE_APP_SESSION_USER);
      if (tokenSession) {
        commit('SET_TOKEN', tokenSession);
      }
      if (userSession) {
        commit('SET_USER', JSON.parse(userSession));
      }
    },
    setFilters({ commit }, filters) {
      filters.forEach((filter) => {
        commit('SET_FILTERS', filter);
      });
      // commit('SET_FILTERS', filters);
    },
    setAuth({ commit }, data) {
      // Validação ou formatação de filtros pode ser feita aqui, se necessário
      commit('SET_TOKEN', data.access_token);
      commit('SET_USER', data.user);
      sessionStorage.setItem(process.env.VUE_APP_SESSION_KEY, data.access_token);
      sessionStorage.setItem(process.env.VUE_APP_SESSION_USER, data.user);
    }
  },
  getters: {
    filters: (state) => state.filters,
    isAuthenticated: (state) => {
      return state.token;
    },
    flagCreditCard: (state) => {
      return state.flagCreditCard;
    }
  },
  modules: {
    dashboard,
    transactions,
    categories,
    accounts,
    creditcards
  }
});
