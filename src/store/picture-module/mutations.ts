/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PictureDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { IPicture } from './state';

const mutation: MutationTree<IPicture> = {
  getAllPictures(state, payload: PictureDto[]) {
    state.pictures = [];
    state.pictures.push(...payload);
  },

  async getOnePicture(state, payload: PictureDto) {
    state.pictures.push(payload);
  },

  async createPicture(state, payload: PictureDto) {
    state.pictures.push(payload);
  },

  async removePicture(state, payload: PictureDto) {
    state.pictures.push(payload);
  }
};

export default mutation;
