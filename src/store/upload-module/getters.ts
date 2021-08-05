import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IUploadStates} from './state';

const getters: GetterTree<IUploadStates, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
