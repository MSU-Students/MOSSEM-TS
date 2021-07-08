import { ApiProperty } from '@nestjs/swagger';
import { IInstrument } from '../interfaces/instrument.interface';

export class InstrumentDto implements IInstrument {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  description!: string;
}
