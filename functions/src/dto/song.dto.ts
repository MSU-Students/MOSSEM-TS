import { ApiProperty } from '@nestjs/swagger';
import { ISong } from '../interfaces/song.interface';

export class SongDto implements ISong {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  songwriter: string;
  @ApiProperty()
  performedplaces: string;
  @ApiProperty()
  datecreated: string;
}
