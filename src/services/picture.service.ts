import { PictureDto, DefaultApi } from './rest-api/api';
import { Configuration } from './rest-api';
const localBasePath =
  'http://localhost:9201/mossem-dfa21/asia-northeast1/restapi';
class PictureService extends DefaultApi {
  constructor() {
    super(
      new Configuration({
        basePath: localBasePath
      })
    );
  }

  async getAllPictures() {
    const response = await this.getPictures();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOnePicture(id: string) {
    const response = await this.getPicture(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createPicture(payload: PictureDto) {
    const response = await this.addPicture(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editPicture(id: string, payload: PictureDto) {
    const response = await this.updatePicture(id, payload);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removePicture(id: string) {
    const response = await this.deletePicture(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const pictureService = new PictureService();
