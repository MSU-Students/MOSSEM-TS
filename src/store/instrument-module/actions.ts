import { instrumentService } from 'src/services/instrument.service';
import { InstrumentDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IInstrument } from './state';

const actions: ActionTree<IInstrument, StateInterface> = {
  async getAllInstruments(context) {
    const response = await instrumentService.getAllInstruments();
    context.commit('getAllInstruments', response);
    return response;
  },

  async getOneInstrument(context, id: string) {
    const response = await instrumentService.getOneInstrument(id);
    context.commit('getOneInstrument', response);
    return response;
  },

  async createInstrument(context, payload: InstrumentDto) {
    const response = await instrumentService.createInstrument(payload);
    context.commit('createInstrument', response);
    return response;
  },

  async updateInstrument({}, payload: any) {
    const response = await instrumentService.editInstrument(payload.id, payload);
    return response;
  },

  async removeInstrument(context, id: string) {
    const response = await instrumentService.removeInstrument(id);
    context.commit('removeInstrument', response);
    return response;
  }
};

export default actions;
