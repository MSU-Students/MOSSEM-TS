export type FileTypes = 'audio' | 'video' | 'image';
export interface IUploadFile {
  filename: string;
  content: File;
  type: FileTypes;
  progress: number; //0 - 100
  url: string;
}

export interface IUploadStates {
  uploads: IUploadFile[];
}

function state(): IUploadStates {
  return {
    uploads: []
  };
}

export default state;
