import { SongDto, DefaultApi } from './rest-api/api';
import { Configuration } from './rest-api';
const localBasePath =
  'http://localhost:9201/mossem-dfa21/asia-northeast1/restapi';
class SongService extends DefaultApi {
  constructor() {
    super(
      new Configuration({
        basePath: localBasePath
      })
    );
  }

  async getAllSongs() {
    const response = await this.getSongs();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneSong(id: string) {
    const response = await this.getSong(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createSong(payload: SongDto) {
    const response = await this.addSong(payload);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async editSong(id: string, payload: SongDto) {
    const response = await this.updateSong(id, payload);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeSong(id: string) {
    const response = await this.deleteSong(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const songService = new SongService();
