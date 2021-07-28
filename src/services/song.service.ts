import { SongDto } from './rest-api/api';
import { restApi } from './rest-api.service';
class SongService  {


  async getAllSongs() {
    const response = await restApi.getSongs();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneSong(id: string) {
    const response = await restApi.getSong(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createSong(payload: SongDto) {
    const response = await restApi.addSong(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editSong(id: string, payload: SongDto) {
    console.log(id, payload);
    const response = await restApi.updateSong(id, payload);
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeSong(id: string) {
    const response = await restApi.deleteSong(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const songService = new SongService();
