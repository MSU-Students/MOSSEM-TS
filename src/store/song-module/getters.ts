import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ISong } from './state';

const getters: GetterTree<ISong, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
