import { ApiProperty } from '@nestjs/swagger';
import { IPicture } from '../interfaces/picture.interface';

export class PictureDto implements IPicture {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  description!: string;
}
