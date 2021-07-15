import { InstrumentDto } from 'src/services/rest-api';

export interface IInstrument {
  createInstrument: InstrumentDto;
  instruments: InstrumentDto[];
}

function state(): IInstrument {
  return {
    createInstrument: {
      id: '',
      url: '',
      name: '',
      description: ''
    },
    instruments: []
  };
}

export default state;
