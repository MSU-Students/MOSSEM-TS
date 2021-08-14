import { danceService } from 'src/services/dance.service';
import { equipmentService } from 'src/services/equipment.service';
import { instrumentService } from 'src/services/instrument.service';
import { pictureService } from 'src/services/picture.service';
import { PictureDto } from 'src/services/rest-api';
import { songService } from 'src/services/song.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ISearchState } from './state';

let response;
let filtered;

const actions: ActionTree<ISearchState, StateInterface> = {
  async searchFromAll(context, keywords: string) {
    //dance
    response = await danceService.getAllDances();
    filtered = response.filter(r => r.name.toLowerCase() === keywords.toLowerCase());

    // gallery
    response = await pictureService.getAllPictures();
    filtered = response.filter(r => r.name.toLowerCase() === keywords.toLowerCase());

    //instrucment
    response = await instrumentService.getAllInstruments();
    filtered = response.filter(r => r.name.toLowerCase() === keywords.toLowerCase());


    //song
    response = await songService.getAllSongs();
    filtered = response.filter(r => r.name.toLowerCase() === keywords.toLowerCase());

    //equipments
    response = await equipmentService.getAllEquipments();
    filtered = response.filter(r => r.name.toLowerCase() === keywords.toLowerCase());


    context.commit('resultFiltered', filtered);
  }
};

export default actions;
