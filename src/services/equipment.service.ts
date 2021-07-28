import { EquipmentDto } from './rest-api/api';
import { restApi } from './rest-api.service';

class EquipmentService {
  async getAbout() {
    const response = await restApi.about();
    if (response.status == 200) {
      return response.data;
    } else {
      return 'rest api not connected!';
    }
  }

  async getAllEquipments() {
    const response = await restApi.getEquipments();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneEquipment(id: string) {
    const response = await restApi.getEquipment(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createEquipment(payload: EquipmentDto) {
    const response = await restApi.addEquipment(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editEquipment(id: string, payload: EquipmentDto) {
    console.log(id, payload);
    const response = await restApi.updateEquipment(id, payload);
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeEquipment(id: string) {
    const response = await restApi.deleteEquipment(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const equipmentService = new EquipmentService();
