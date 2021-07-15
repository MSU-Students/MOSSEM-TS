import { songService } from 'src/services/song.service';
import { SongDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ISong } from './state';

const actions: ActionTree<ISong, StateInterface> = {
  async getAllSongs(context) {
    const response = await songService.getAllSongs();
    context.commit('getAllSongs', response);
    return response;
  },

  async getOneSong(context, id: string) {
    const response = await songService.getOneSong(id);
    context.commit('getOneSong', response);
    return response;
  },

  async createSong(context, payload: SongDto) {
    const response = await songService.createSong(payload);
    context.commit('createSong', response);
    return response;
  },

  async updateSong(context, payload: any) {
    const { id, dance } = payload;
    const response = await songService.updateSong(id, dance);
    context.commit('updateSong', response);
    return response;
  },

  async removeSong(context, id: string) {
    const response = await songService.removeSong(id);
    context.commit('removeSong', response);
    return response;
  }
};

export default actions;
