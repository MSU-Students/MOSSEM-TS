import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpload } from 'src/interfaces/upload.interface';

export class UploadDto implements IUpload {
  @IsString()
  name: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
