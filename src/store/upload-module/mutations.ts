import { MutationTree } from 'vuex';
import { IUploadFile, IUploadStates } from './state';

const mutation: MutationTree<IUploadStates> = {
  uploadFile(state, payload: IUploadFile) {
    state.uploads.push(payload);
  },

  async updateProgress(state, payload: { index: number, progress: number, url?: string}) {
    if (payload.index >= 0 && state.uploads.length > payload.index) {
      const upload = state.uploads[payload.index];
      upload.progress = payload.progress;
      upload.url = payload.url || upload.url;
    }
  },

};

export default mutation;
