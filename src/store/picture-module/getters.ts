import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IPicture } from './state';

const getters: GetterTree<IPicture, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
