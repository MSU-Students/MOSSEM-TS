import { equipmentService } from 'src/services/equipment.service';
import { EquipmentDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IEquipment } from './state';

const actions: ActionTree<IEquipment, StateInterface> = {
  async getAllEquipments(context) {
    const response = await equipmentService.getAllEquipments();
    context.commit('getAllEquipments', response);
    return response;
  },

  async getOneEquipment(context, id: string) {
    const response = await equipmentService.getOneEquipment(id);
    context.commit('getOneEquipment', response);
    return response;
  },

  async createEquipment(context, payload: EquipmentDto) {
    const response = await equipmentService.createEquipment(payload);
    context.commit('createEquipment', response);
    return response;
  },

  async updateEquipment({}, payload: any) {
    const response = await equipmentService.editEquipment(payload.id, payload);
    return response;
  },

  async removeEquipment(context, id: string) {
    const response = await equipmentService.removeEquipment(id);
    context.commit('removeEquipment', response);
    return response;
  }
};

export default actions;
