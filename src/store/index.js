import api from '@/api/api';
import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './dashboard';
import transactions from './transactions';
import categories from './category';

import trasactionsFormAdd from '@/views/transactions/form/add/index.vue';

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
        component: trasactionsFormAdd
      },
      {
        name: 'Categorias',
        icon: 'bookmarks',
        link: '/categorias',
        add: true
      },
      {
        name: 'Contas',
        icon: 'bank',
        link: '/contas',
        add: true
      },
      {
        name: 'Cartões',
        icon: 'credit-card-2-back',
        link: '/cartoes',
        add: true
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
        }
        return data.data;
      });
    },
    async logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
      sessionStorage.removeItem(process.env.VUE_APP_SESSION_KEY);
    },
    checkAuthentication({ commit }) {
      const tokenSession = sessionStorage.getItem(process.env.VUE_APP_SESSION_KEY);
      if (tokenSession) {
        commit('SET_TOKEN', tokenSession);
      }
    },
    setFilters({ commit }, filters) {
      // Validação ou formatação de filtros pode ser feita aqui, se necessário
      commit('SET_FILTERS', filters);
    },
    setAuth({ commit }, data) {
      // Validação ou formatação de filtros pode ser feita aqui, se necessário
      commit('SET_TOKEN', data.access_token);
      commit('SET_USER', data.user);
      sessionStorage.setItem(process.env.VUE_APP_SESSION_KEY, data.access_token);
    }
  },
  getters: {
    filters: (state) => state.filters,
    isAuthenticated: (state) => {
      return state.token;
    }
  },
  modules: {
    dashboard,
    transactions,
    categories
  }
});
