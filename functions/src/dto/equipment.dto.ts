import { ApiProperty } from '@nestjs/swagger';
import { IEquipment } from '../interfaces/equipment.interface';

export class EquipmentDto implements IEquipment {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  dateaquired: string;
  @ApiProperty()
  quantity: string;
  @ApiProperty()
  status: string;
}
