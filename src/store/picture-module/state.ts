import { PictureDto } from 'src/services/rest-api';

export interface IPicture {
  createPicture: PictureDto;
  pictures: PictureDto[];
}

function state(): IPicture {
  return {
    createPicture: {
      id: '',
      url: '',
      name: '',
      description: ''
    },
    pictures: []
  };
}

export default state;
