import { DanceDto } from 'src/services/rest-api';

export interface IDance {
  createDance: DanceDto;
  dances: DanceDto[];
}

function state(): IDance {
  return {
    createDance: {
      id: '',
      url: '',
      name: '',
      description: ''
    },
    dances: []
  };
}

export default state;
