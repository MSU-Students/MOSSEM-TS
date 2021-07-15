import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UiNavStateInterface } from './state';

const actions: ActionTree<UiNavStateInterface, StateInterface> = {
  addDancePopups(context, payload: boolean) {
    context.commit('addDancePopups', payload);
  },
  addInstrumentPopups(context, payload: boolean) {
    context.commit('addInstrumentPopups', payload);
  },
  addPicturePopups(context, payload: boolean) {
    context.commit('addPicturePopups', payload);
  },
  addSongPopups(context, payload: boolean) {
    context.commit('addSongPopups', payload);
  }
};

export default actions;
