import { MutationTree } from 'vuex';
import { UiNavStateInterface } from './state';

const mutation: MutationTree<UiNavStateInterface> = {
  addDancePopups(state, payload: boolean) {
    state.ShowDanceDialog = payload;
  },
  addInstrumentPopups(state, payload: boolean) {
    state.ShowInstrumentDialog = payload;
  },
  addPicturePopups(state, payload: boolean) {
    state.ShowPictureDialog = payload;
  },
  addSongPopups(state, payload: boolean) {
    state.ShowSongDialog = payload;
  }
};

export default mutation;
