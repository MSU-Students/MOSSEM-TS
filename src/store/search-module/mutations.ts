/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PictureDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { ISearchResult, ISearchState } from './state';

const mutation: MutationTree<ISearchState> = {
  setKeyword(state, keywords: string) {
    state.keywords = keywords;
  },
  resultFiltered(state, payload: PictureDto[]) {
    const searchResult: ISearchResult[] = payload.map(pDto => ({
      category: 'picture',
      content: pDto
    }));
    state.result = searchResult;
  }
};

export default mutation;
