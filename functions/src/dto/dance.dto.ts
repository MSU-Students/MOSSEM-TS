import { ApiProperty } from '@nestjs/swagger';
import { IDance } from '../interfaces/dance.interface';

export class DanceDto implements IDance {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
