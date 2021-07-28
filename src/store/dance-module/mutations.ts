/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DanceDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { IDance } from './state';

const mutation: MutationTree<IDance> = {
  getAllDances(state, payload: DanceDto[]) {
    state.dances = [];
    state.dances.push(...payload);
  },

  async getOneDance(state, payload: DanceDto) {
    state.dances.push(payload);
  },

  async createDance(state, payload: DanceDto) {
    state.dances.push(payload);
  },

  async removeDance(state, payload: DanceDto) {
    state.dances.push(payload);
  }
};

export default mutation;
