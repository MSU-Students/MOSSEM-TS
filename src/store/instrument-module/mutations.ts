/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { InstrumentDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { IInstrument } from './state';

const mutation: MutationTree<IInstrument> = {
  getAllInstruments(state, payload: InstrumentDto[]) {
    state.instruments = [];
    state.instruments.push(...payload);
  },

  async getOneInstrument(state, payload: InstrumentDto) {
    state.instruments.push(payload);
  },

  async createInstrument(state, payload: InstrumentDto) {
    console.log(payload);
    state.instruments.push(payload);
  },

  async updateInstrument(state, payload: InstrumentDto) {
    state.instruments.push(payload);
  },

  async removeInstrument(state, payload: InstrumentDto) {
    state.instruments.push(payload);
  }
};

export default mutation;
