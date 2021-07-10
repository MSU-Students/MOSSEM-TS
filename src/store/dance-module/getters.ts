import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IDance } from './state';

const getters: GetterTree<IDance, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
