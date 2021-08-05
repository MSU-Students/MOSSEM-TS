import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';

const getters: GetterTree<IAuthState, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
  isLoggedIn(context) {
    if (context.currentUser) {
      return true;
    }
    return false;
  }
};

export default getters;
