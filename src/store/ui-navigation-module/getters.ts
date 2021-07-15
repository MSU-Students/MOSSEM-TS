import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UiNavStateInterface } from './state';

const getters: GetterTree<UiNavStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  }
};

export default getters;
