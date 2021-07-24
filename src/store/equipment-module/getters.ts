import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IEquipment } from './state';

const getters: GetterTree<IEquipment, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
