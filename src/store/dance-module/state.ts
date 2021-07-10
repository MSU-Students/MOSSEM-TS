export interface IDance {
  dance: {
    id?: string;
    url: string;
    name: string;
    description: string;
  };
  dances: string[];
}

function state(): IDance {
  return {
    dance: {
      id: '',
      url: '',
      name: '',
      description: ''
    },
    dances: []
  };
}

export default state;
