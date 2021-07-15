/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SongDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { ISong } from './state';

const mutation: MutationTree<ISong> = {
  getAllSongs(state, payload: SongDto[]) {
    state.songs = [];
    state.songs.push(...payload);
  },

  async getOneSong(state, payload: SongDto) {
    state.songs.push(payload);
  },

  async createSong(state, payload: SongDto) {
    state.songs.push(payload);
  },

  async updateSong(state, payload: SongDto) {
    state.songs.push(payload);
  },

  async removeSong(state, payload: SongDto) {
    state.songs.push(payload);
  }
};

export default mutation;
