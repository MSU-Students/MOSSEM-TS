import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import dance from './dance-module';
import { IDance } from './dance-module/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  dance: IDance;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      dance
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
