import { EquipmentDto } from 'src/services/rest-api';

export interface IEquipment {
  createEquipment: EquipmentDto;
  equipments: EquipmentDto[];
}

function state(): IEquipment {
  return {
    createEquipment: {
      id: '',
      url: '',
      name: '',
      description: '',
      dateaquired: '',
      quantity: '',
      status: ''
    },
    equipments: []
  };
}

export default state;
