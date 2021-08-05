import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
  } from '@nestjs/swagger';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { InstrumentDto } from '../dto/instrument.dto';
  import { InstrumentService } from './instrument.service';
  
  @Controller('instrument')
  export class InstrumentController {
    constructor(private readonly instrumentService: InstrumentService) {}
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: InstrumentDto })
    @ApiOperation({ summary: 'Add new instrument', operationId: 'AddInstrument' })
    @ApiResponse({ status: 200, type: InstrumentDto })
    @Post()
    async create(@Body() newInstrument: InstrumentDto): Promise<InstrumentDto> {
      return this.instrumentService.create(newInstrument);
    }
  
    @ApiOperation({
      summary: 'Get information of all instrument',
      operationId: 'GetInstruments',
    })
    @ApiResponse({ status: 200, isArray: true, type: InstrumentDto })
    @Get()
    async findAll(): Promise<InstrumentDto[]> {
      return (await this.instrumentService.findAll());
    }
  
    @ApiOperation({
      summary: 'Get information of instrument with id {id}',
      operationId: 'GetInstrument',
    })
    @ApiResponse({ status: 200, type: InstrumentDto })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<InstrumentDto> {
      return this.instrumentService.findOne(id);
    }
  
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
      summary: 'Delete instrument with id {id}',
      operationId: 'DeleteInstrument',
    })
    @ApiResponse({ status: 200, type: InstrumentDto })
    @Delete(':id')
    async deleteOne(@Param('id') id: string): Promise<InstrumentDto> {
      return this.instrumentService.deleteOne(id);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'update instrument', operationId: 'UpdateInstrument' })
    @ApiBody({ type: InstrumentDto })
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() player: InstrumentDto,
    ): Promise<InstrumentDto> {
      return this.instrumentService.update(id, player);
    }
  }
  