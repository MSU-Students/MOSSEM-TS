import { PictureDto } from 'src/services/rest-api';

export interface IPicture {
  activePicture: PictureDto;
  pictures: PictureDto[];
}

function state(): IPicture {
  return {
    activePicture: {
      id: '',
      url: '',
      name: '',
      description: ''
    },
    pictures: []
  };
}

export default state;
