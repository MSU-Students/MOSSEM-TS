import { ApiProperty } from '@nestjs/swagger';
import { ISong } from '../interfaces/song.interface';

export class SongDto implements ISong {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  description!: string;
  @ApiProperty()
  lyrics!: string;
}
