import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import Dashboard from '@/views/dashboard';
import Transactions from '@/views/transactions';
import Category from '@/views/category';
import Login from '@/views/login';
import AuthCallback from '@/views/authcallback';
import Logout from '@/views/logout';
import Account from '@/views/account';
import CreditCard from '@/views/creditcard';
// PAGE IMPORTS

Vue.use(VueRouter);

const routes = [
  {
    path: '/lancamentos',
    name: 'lançamentos',
    component: Transactions,
    meta: { title: 'Lançamentos', icon: 'bar-chart-steps', showDatePicker: true, requiresAuth: true }
  },

  {
    path: '/categorias',
    name: 'categoria',
    component: Category,
    meta: { title: 'Categorias', icon: 'bookmarks-fill', showDatePicker: false, requiresAuth: true }
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Login', icon: 'columns-gap', showDatePicker: false }
  },

  {
    path: '/auth/callback',
    name: 'authcallback',
    component: AuthCallback,
    meta: { title: 'Auth callback', icon: 'columns-gap', showDatePicker: false }
  },

  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: { title: 'Logout', icon: 'columns-gap', showDatePicker: false }
  },

  {
    path: '/contas',
    name: 'contas',
    component: Account,
    meta: { title: 'Contas', icon: 'columns-gap', showDatePicker: false }
  },

  {
    path: '/cartoes',
    name: 'cartoes',
    component: CreditCard,
    meta: { title: 'Cartão de crédito', icon: 'columns-gap', showDatePicker: false }
  },
  // ADD ROUTE

  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard', icon: 'columns-gap', showDatePicker: true, requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard', icon: 'columns-gap', showDatePicker: true, requiresAuth: true }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem(process.env.VUE_APP_SESSION_KEY);
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    router({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    router({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
