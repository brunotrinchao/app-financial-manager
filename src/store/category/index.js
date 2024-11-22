import state from './state.js';
import api from '@/api/api';
export default {
  namespaced: true,
  state,
  getters: {},
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async indexCategories({ commit }, params = {}) {
      return await api.obter('/categories', params).then((data) => {
        commit('SET_CATEGORIES', data);
        return data.data;
      });
    }
  }
};
