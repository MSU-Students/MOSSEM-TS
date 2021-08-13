import { pictureService } from 'src/services/picture.service';
import { PictureDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ISearchState } from './state';

const actions: ActionTree<ISearchState, StateInterface> = {
  async searchFromAll(context, keywords: string) {
    context.commit('setKeyword', keywords);
    
    const responsePicture = await pictureService.getAllPictures();
    const filteredPictures = responsePicture.filter(r => r.name.search(keywords));
    context.commit('addPictureResults', filteredPictures);
    
    //instrucment

    //dance

    //song

    //equipments
    
    return responsePicture;
  },

};

export default actions;
