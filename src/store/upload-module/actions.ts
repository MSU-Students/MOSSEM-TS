import uploadService from 'src/services/upload.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { FileTypes, IUploadFile, IUploadStates } from './state';

const actions: ActionTree<IUploadStates, StateInterface> = {
  async uploadFile(context, payload: {file: File, type: FileTypes}) {
    const upload : IUploadFile = {
      content: payload.file,
      filename: payload.file.name,
      progress: 0,
      type: payload.type,
      url: '',
    }
    context.commit('uploadFile', upload);
    const latestUpload = context.state.uploads.length - 1;
    const resUrl: string = await uploadService.uploadFile(payload.file, payload.type , (percentage) => {
      context.commit('updateProgress', {
        index: latestUpload,
        progress: percentage
      })
    });
    context.commit('updateProgress', {
      index: latestUpload,
      progress: 100,
      url: resUrl
    })
    return context.state.uploads[latestUpload];
  }
};

export default actions;
