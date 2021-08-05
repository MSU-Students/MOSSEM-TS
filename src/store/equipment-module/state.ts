import { EquipmentDto } from 'src/services/rest-api';

export interface IEquipment {
  activeEquipment: EquipmentDto;
  equipments: EquipmentDto[];
}

function state(): IEquipment {
  return {
    activeEquipment: {
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
