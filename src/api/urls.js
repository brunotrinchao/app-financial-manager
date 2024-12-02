let BASE, BASE_API, BASE_IMG, SERVER, ENVIRONMENT;
// if (process.env.VUE_APP_DEVELOPMENT == 'development') {
//   BASE = process.env.VUE_APP_API_URL;
//   BASE_API = `${BASE}/api`;
//   BASE_IMG = `${BASE}`;
//   SERVER = 'D';
//   ENVIRONMENT = process.env.VUE_APP_DEVELOPMENT;
// } else {
BASE = process.env.VUE_APP_API_URL;
BASE_API = `${BASE}/api`;
BASE_IMG = `${BASE}`;
SERVER = 'P';
ENVIRONMENT = process.env.VUE_APP_DEVELOPMENT;
// }

export default {
  BASE_API: BASE_API,
  BASE_IMG: BASE_IMG,
  SERVER: SERVER,
  ENVIRONMENT: ENVIRONMENT
};
