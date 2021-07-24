/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EquipmentDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { IEquipment } from './state';

const mutation: MutationTree<IEquipment> = {
  getAllEquipments(state, payload: EquipmentDto[]) {
    state.equipments = [];
    state.equipments.push(...payload);
  },

  async getOneEquipment(state, payload: EquipmentDto) {
    state.equipments.push(payload);
  },

  async createEquipment(state, payload: EquipmentDto) {
    state.equipments.push(payload);
  },

  async updateEquipment(state, payload: EquipmentDto) {
    state.equipments.push(payload);
  },

  async removeEquipment(state, payload: EquipmentDto) {
    state.equipments.push(payload);
  }
};

export default mutation;
