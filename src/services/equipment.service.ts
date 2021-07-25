import { EquipmentDto, DefaultApi } from './rest-api/api';
import { Configuration } from './rest-api';
const localBasePath =
  'http://localhost:9201/mossem-dfa21/asia-northeast1/restapi';
class EquipmentService extends DefaultApi {
  constructor() {
    super(
      new Configuration({
        basePath: localBasePath
      })
    );
  }

  async getAbout() {
    const response = await this.about();
    if (response.status == 200) {
      return response.data;
    } else {
      return 'rest api not connected!';
    }
  }

  async getAllEquipments() {
    const response = await this.getEquipments();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneEquipment(id: string) {
    const response = await this.getEquipment(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createEquipment(payload: EquipmentDto) {
    const response = await this.addEquipment(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editEquipment(id: string, payload: EquipmentDto) {
    console.log(id, payload);
    const response = await this.updateEquipment(id, payload);
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeEquipment(id: string) {
    const response = await this.deleteEquipment(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const equipmentService = new EquipmentService();
