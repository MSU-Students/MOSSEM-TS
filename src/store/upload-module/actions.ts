import uploadService from 'src/services/upload.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { FileTypes, IUploadFile, IUploadStates } from './state';

const actions: ActionTree<IUploadStates, StateInterface> = {
  async uploadFile(context, payload: {file: File, type: FileTypes, title:string}) {
    let latestUploadIndex = context.state.uploads.length;
    const info = await uploadService.uploadFile(payload.file, payload.type , (percentage) => {
      context.commit('updateProgress', {
        index: latestUploadIndex,
        progress: percentage
      })
    });
    const upload : IUploadFile = {
      content: payload.file,
      filename: payload.file.name,
      progress: 0,
      type: payload.type,
      title: payload.title,
      url: info.url,
      pause: info.pause,
      resume: info.resume
    }
    context.commit('uploadFile', upload);
    latestUploadIndex = context.state.uploads.length - 1;
    return context.state.uploads[latestUploadIndex];
  } 
};

export default actions;
