import { DanceDto } from './rest-api/api';
import { restApi } from './rest-api.service';
class DanceService {
  async getAbout() {
    const response = await restApi.about();
    if (response.status == 200) {
      return response.data;
    } else {
      return 'rest api not connected!';
    }
  }

  async getAllDances() {
    const response = await restApi.getDances();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneDance(id: string) {
    const response = await restApi.getDance(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createDance(payload: DanceDto) {
    const response = await restApi.addDance(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editDance(id: string, payload: DanceDto) {
    console.log(id, payload);
    const response = await restApi.updateDance(id, payload);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeDance(id: string) {
    const response = await restApi.deleteDance(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const danceService = new DanceService();
