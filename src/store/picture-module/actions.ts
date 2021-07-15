import { pictureService } from 'src/services/picture.service';
import { PictureDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IPicture } from './state';

const actions: ActionTree<IPicture, StateInterface> = {
  async getAllPictures(context) {
    const response = await pictureService.getAllPictures();
    context.commit('getAllPictures', response);
    return response;
  },

  async getOnePicture(context, id: string) {
    const response = await pictureService.getOnePicture(id);
    context.commit('getOnePicture', response);
    return response;
  },

  async createPicture(context, payload: PictureDto) {
    const response = await pictureService.createPicture(payload);
    context.commit('createPicture', response);
    return response;
  },

  async updatePicture(context, payload: any) {
    const { id, dance } = payload;
    const response = await pictureService.updatePicture(id, dance);
    context.commit('updatePicture', response);
    return response;
  },

  async removePicture(context, id: string) {
    const response = await pictureService.removePicture(id);
    context.commit('removePicture', response);
    return response;
  }
};

export default actions;
