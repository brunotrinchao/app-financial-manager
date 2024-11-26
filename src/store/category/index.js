import state from './state.js';
import api from '@/api/api';
export default {
  namespaced: true,
  state,
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async indexCategories({ commit }, params = {}) {
      return await api.obter('/categories', params).then((data) => {
        if (data?.data.length) {
          commit('SET_CATEGORIES', data.data);
          return data.data;
        }
        return [];
      });
    },
    async storeCategories(_, params) {
      return await api.inserir('/categories', params).then((data) => {
        if (data?.data.length) {
          return data.data;
        }
        return [];
      });
    },
    async updateCategories(_, { id, params }) {
      return await api.alterar(`/categories/${id}`, params).then((data) => {
        if (data?.data.length) {
          return data.data;
        }
        return [];
      });
    }
  },
  getters: {
    categories: (state) => state.categories,
    pagination: (state) => state.pagination,
    categoryById: (state) => (id) => {
      return state.categories.find((categorie) => categorie.id === id);
    },
    _categoryByName: (state) => (name) => {
      console.log(name);
      return state.categories.find((categorie) => categorie.name === name);
    }
  }
};
