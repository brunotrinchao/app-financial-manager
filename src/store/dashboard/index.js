import state from './state.js';
import api from '@/api/api';

export default {
  namespaced: true,
  state,
  mutations: {},
  actions: {
    async indexIndicators(_, params = {}) {
      return await api.obter('/dashboard/indicators', params).then((data) => {
        if (data) {
          return data;
        }
        return [];
      });
    },
    async indexChart(_, { url, params }) {
      return await api.obter(`/dashboard/${url}`, params).then((data) => {
        if (data) {
          return data;
        }
        return [];
      });
    }
  },
  getters: {}
};
