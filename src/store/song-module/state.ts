import { SongDto } from 'src/services/rest-api';

export interface ISong {
  activeSong: SongDto;
  songs: SongDto[];
}

function state(): ISong {
  return {
    activeSong: {
      id: '',
      url: '',
      name: '',
      description: '',
      datecreated: '',
      songwriter: '',
      performedplaces: ''
    },
    songs: []
  };
}

export default state;
