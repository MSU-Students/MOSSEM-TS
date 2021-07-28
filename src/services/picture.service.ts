import { PictureDto } from './rest-api/api';
import { restApi } from './rest-api.service';

class PictureService {
  async getAllPictures() {
    const response = await restApi.getPictures();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOnePicture(id: string) {
    const response = await restApi.getPicture(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createPicture(payload: PictureDto) {
    const response = await restApi.addPicture(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editPicture(id: string, payload: PictureDto) {
    const response = await restApi.updatePicture(id, payload);
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removePicture(id: string) {
    const response = await restApi.deletePicture(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const pictureService = new PictureService();
