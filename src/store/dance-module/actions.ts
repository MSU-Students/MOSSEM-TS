import { danceService } from 'src/services/dance.service';
import { DanceDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IDance } from './state';

const actions: ActionTree<IDance, StateInterface> = {
  async getAllDances(context) {
    const response = await danceService.getAllDances();
    context.commit('getAllDances', response);
    return response;
  },

  async getOneDance(context, id: string) {
    const response = await danceService.getOneDance(id);
    context.commit('getOneDance', response);
    return response;
  },

  async createDance(context, payload: DanceDto) {
    const response = await danceService.createDance(payload);
    context.commit('createDance', response);
    return response;
  },

  async updateDance({}, payload: any) {
    const response = await danceService.editDance(payload.id, payload);
    return response;
  },

  async removeDance(context, id: string) {
    const response = await danceService.removeDance(id);
    context.commit('removeDance', response);
    return response;
  }
};

export default actions;
