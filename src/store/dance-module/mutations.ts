/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MutationTree } from 'vuex';
import { IDance } from './state';

const mutation: MutationTree<IDance> = {
  getAllDances(state, payload: string[]) {
    state.dances = payload;
  }
};

export default mutation;
