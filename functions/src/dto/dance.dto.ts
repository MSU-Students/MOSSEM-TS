import { ApiProperty } from '@nestjs/swagger';
import { IDance } from 'src/interfaces/dance.interface';

export class DanceDto implements IDance {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  url!: string;
  @ApiProperty()
  description!: string;
}
