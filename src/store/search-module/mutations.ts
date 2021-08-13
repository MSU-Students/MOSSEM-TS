/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PictureDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { ISearchResult, ISearchState } from './state';


const mutation: MutationTree<ISearchState> = {
  setKeyword(state, keywords: string) {
    state.keywords = keywords;  
  },
  addPictureResults(state, payload: PictureDto[]) {
    const searchResult:ISearchResult[] = payload.map(pDto => ({
        category: 'picture',
        content: pDto
    }))
  }
};

export default mutation;
