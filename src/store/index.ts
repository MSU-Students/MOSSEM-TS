import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
import dance from './dance-module';
import instrument from './instrument-module';
import equipment from './equipment-module';
import song from './song-module';
import picture from './picture-module';
import uploads from './upload-module';
import search from './search-module';
import { IDance } from './dance-module/state';
import { IInstrument } from './instrument-module/state';
import { IPicture } from './picture-module/state';
import { ISong } from './song-module/state';
import { IEquipment } from './equipment-module/state';
import { IUploadStates } from './upload-module/state';
import { ISearchState } from './search-module/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  dance: IDance;
  picture: IPicture;
  instrument: IInstrument;
  song: ISong;
  equipment: IEquipment;
  uploads: IUploadStates;
  result: ISearchState;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      dance,
      picture,
      instrument,
      equipment,
      song,
      uploads,
      search
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
