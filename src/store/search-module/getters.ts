import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ISearchState } from './state';

const getters: GetterTree<ISearchState, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
