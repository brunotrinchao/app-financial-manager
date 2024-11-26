import state from './state.js';
import api from '@/api/api';

export default {
  namespaced: true,
  state,
  mutations: {
    SET_ACCOUNT(state, accounts) {
      state.accounts = accounts;
    }
  },
  actions: {
    async indexAccounts({ commit }, params = {}) {
      return await api.obter('/accounts', params).then((data) => {
        if (data?.data.length) {
          commit('SET_ACCOUNT', data.data);
          return data.data;
        }
        return [];
      });
    },
    async storeAccounts(_, params) {
      return await api.inserir('/accounts', params).then((data) => {
        if (data?.data.length) {
          return data.data;
        }
        return [];
      });
    },
    async updateAccounts(_, { id, params }) {
      return await api.alterar(`/accounts/${id}`, params).then((data) => {
        if (data?.data.length) {
          return data.data;
        }
        return [];
      });
    }
  },
  getters: {
    // transactions: (state) => {
    //   return state.transactions;
    // }
    accounts: (state) => state.accounts,
    pagination: (state) => state.pagination,
    accountById: (state) => (id) => {
      return state.accounts.find((categorie) => categorie.id === id);
    },
    accountByName: (state) => (name) => {
      console.log(name);
      return state.accounts.find((categorie) => categorie.name === name);
    }
  }
};
