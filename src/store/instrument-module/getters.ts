import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IInstrument } from './state';

const getters: GetterTree<IInstrument, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
