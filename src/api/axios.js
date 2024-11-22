import axios from 'axios';
import urls from './urls';
import Vue from 'vue';
import Swal from 'sweetalert2';

// import store from '@/store/auth';

const api = axios.create({
  baseURL: `${urls.BASE_API}`,
  withCredentials: false
});

let configAlert = {
  icon: 'error',
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: false
};
// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    // Adiciona ou atualiza os headers
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    };

    Vue.prototype.$eventBus.$emit('loading:start');

    return config;
  },
  (error) => {
    Vue.prototype.$eventBus.$emit('loading:stop');
    console.error('Erro ao enviar a requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    Vue.prototype.$eventBus.$emit('loading:stop');

    const message = response.data?.message;
    let title = 'Erro';

    if (response.status >= 200 && response.status <= 299) {
      title = 'Sucesso';
      configAlert.icon = 'success';
      configAlert.position = 'center';
      configAlert.showConfirmButton = false;
      configAlert.toast = false;
    }
    if (message) {
      if (typeof message === 'object') {
        Object.keys(message).forEach((key) => {
          Swal.fire({
            title: 'Erro',
            text: message[key][0],
            ...configAlert
          });
        });
      } else {
        Swal.fire({
          title,
          text: message,
          ...configAlert
        });
      }
    }

    return response;
  },
  (error) => {
    Vue.prototype.$eventBus.$emit('loading:stop');
    if (error.response?.status === 401) {
      Swal.fire({
        title: 'Sessão Expirada',
        text: 'Você será redirecionado para o login.',
        ...configAlert
      });
      window.location.href = `${process.env.VUE_APP_BASE_URL}/logout`;
    } else {
      const msg = error.response?.data?.message || error.message;
      Swal.fire({
        title: 'Erro na Requisição',
        text: msg,
        ...configAlert
      });
    }
    return Promise.reject(error);
  }
);

function getToken() {
  return sessionStorage.getItem(process.env.VUE_APP_SESSION_KEY);
}

export default api;
