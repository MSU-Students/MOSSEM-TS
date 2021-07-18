import { DanceDto, DefaultApi } from './rest-api/api';
import { Configuration } from './rest-api';
const localBasePath =
  'http://localhost:9201/mossem-dfa21/asia-northeast1/restapi';
class DanceService extends DefaultApi {
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

  async getAllDances() {
    const response = await this.getDances();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneDance(id: string) {
    const response = await this.getDance(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createDance(payload: DanceDto) {
    const response = await this.addDance(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editDance(id: string, payload: DanceDto) {
    const response = await this.updateDance(id, payload);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeDance(id: string) {
    const response = await this.deleteDance(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const danceService = new DanceService();
