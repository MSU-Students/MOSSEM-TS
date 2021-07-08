import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InstrumentDto } from '../dto/instrument.dto';
import { InstrumentService } from './instrument.service';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}
  @ApiBody({ type:InstrumentDto })
  @ApiOperation({ summary: 'Register new instrument', operationId: 'Register' })
  @ApiResponse({ status: 200, type: InstrumentDto })
  @Post()
  async create(
    @Body() newinstrument:InstrumentDto,
  ): Promise<InstrumentDto> {
    return this.instrumentService.create(newinstrument);
  }
  @ApiOperation({
    summary: 'Get information of instrument with id {id}',
    operationId: 'Getinstrument',
  })
  @ApiResponse({ status: 200, type: InstrumentDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InstrumentDto> {
    return this.instrumentService.findOne(id);
  }

  @ApiOperation({
    summary: 'Delete instrument with id {id}',
    operationId: 'Deleteinstrument',
  })
  @ApiResponse({ status: 200, type: InstrumentDto })
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<InstrumentDto> {
    return this.instrumentService.deleteOne(id);
  }

  @ApiOperation({ summary: 'update instrument', operationId: 'Updateinstrument' })
  @ApiBody({ type: InstrumentDto })
  @Put()
  async update(
    @Param('id') id: string,
    @Body() player: InstrumentDto,
  ): Promise<InstrumentDto> {
    return this.instrumentService.update(id, player);
  }
}
