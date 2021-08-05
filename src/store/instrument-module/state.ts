import { InstrumentDto } from 'src/services/rest-api';

export interface IInstrument {
  activeInstrument: InstrumentDto;
  instruments: InstrumentDto[];
}

function state(): IInstrument {
  return {
    activeInstrument: {
      id: '',
      url: '',
      name: '',
      description: '',
      dateaquired: '',
      quantity: '',
      status: ''
    },
    instruments: []
  };
}

export default state;
