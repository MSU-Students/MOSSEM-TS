import { danceService } from 'src/services/dance.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IDance } from './state';

const actions: ActionTree<IDance, StateInterface> = {
  async getAllDances(context) {
    const dances = await danceService.getAllDances();
    context.commit('getAllDances', dances);
    return dances;
  }
};

export default actions;
