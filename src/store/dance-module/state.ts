import { DanceDto } from 'src/services/rest-api';

export interface IDance {
  activeDance: DanceDto;
  dances: DanceDto[];
}

function state(): IDance {
  return {
    activeDance: {
      id: '',
      url: '',
      name: '',
      description: ''
    },
    dances: []
  };
}

export default state;
