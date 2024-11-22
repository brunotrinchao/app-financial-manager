import api from './axios';

export default {
  obter: async (url, params) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      throw error;
    }
  },

  inserir: async (url, params, loader = false) => {
    try {
      const response = await api.post(url, params, { loader });
      return response.data;
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
      throw error;
    }
  },

  excluir: async (url, id, loader = false) => {
    try {
      const response = await api.delete(`${url}/${id}`, { loader });
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir dados:', error);
      throw error;
    }
  },

  alterar: async (url, params, loader = false) => {
    try {
      const response = await api.put(url, params, { loader });
      return response.data;
    } catch (error) {
      console.error('Erro ao alterar dados:', error);
      throw error;
    }
  }
};
