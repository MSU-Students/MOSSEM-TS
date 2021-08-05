import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { StateInterface, $store } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresGuest)) {
      const isAuth = $store.ref?.state.auth.currentUser;
      if (isAuth) {
        next({
          path: '/admin/dance'
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      $store.ref?.dispatch('auth/authUser').then(()=> {
        const isAuth = $store.ref?.state.auth.currentUser;
        if (!isAuth) {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          });
        } else {
          next();
        }
      }).catch(()=> {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
      });
    } else {
      next();
    }
  });

  return Router;
});
