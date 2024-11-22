import state from './state.js';
import api from '@/api/api';

export default {
  namespaced: true,
  state,
  mutations: {
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions.data;
      state.pagination = {
        total: transactions.meta.total,
        per_page: transactions.meta.per_page,
        current_page: transactions.meta.current_page,
        last_page: transactions.meta.last_page
      };
    }
  },
  actions: {
    async indexTransactions({ commit }, params) {
      return await api.obter('/transactions', params).then((data) => {
        if (data?.data.length) {
          commit('SET_TRANSACTIONS', data);
          return data.data;
        }
        return null;
      });
    },
    async storeTransactions(_, params) {
      console.log(params);
      return await api.inserir('/transactions', params).then((data) => {
        return data.data;
      });
    }
  },

  getters: {
    // transactions: (state) => {
    //   return state.transactions;
    // }
    transactions: (state) => state.transactions,
    pagination: (state) => state.pagination
  }
};
