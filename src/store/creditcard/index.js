import state from './state.js';
import api from '@/api/api';

export default {
  namespaced: true,
  state,
  mutations: {
    SET_CREDITCARDS(state, creditcards) {
      state.creditcards = creditcards;
    }
  },
  actions: {
    async indexCreditCards({ commit }, params = {}) {
      return await api.obter('/credit-cards', params).then((data) => {
        if (data?.data.length) {
          commit('SET_CREDITCARDS', data.data);
          return data.data;
        }
        return [];
      });
    },
    async storeCreditCards(_, params) {
      return await api.inserir('/credit-cards', params).then((data) => {
        if (data?.data.length) {
          return data.data;
        }
        return [];
      });
    },
    async updateCreditCards(_, { id, params }) {
      return await api.alterar(`/credit-cards/${id}`, params).then((data) => {
        if (data?.data.length) {
          return data.data;
        }
        return [];
      });
    }
  },
  getters: {
    creditcards: (state) => state.creditcards,
    pagination: (state) => state.pagination,
    creditcardById: (state) => (id) => {
      return state.creditcards.find((categorie) => categorie.id === id);
    },
    creditcardByName: (state) => (name) => {
      console.log(name);
      return state.creditcards.find((categorie) => categorie.name === name);
    }
  }
};
