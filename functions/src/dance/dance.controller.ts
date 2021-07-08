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
import { DanceDto } from '../dto/dance.dto';
import { DanceService } from './dance.service';

@Controller('dance')
export class DanceController {
  constructor(private readonly danceService: DanceService) {}
  @ApiBody({ type: DanceDto })
  @ApiOperation({ summary: 'Register new dance', operationId: 'Register' })
  @ApiResponse({ status: 200, type: DanceDto })
  @Post()
  async create(
    @Body() newdance: DanceDto,
  ): Promise<DanceDto> {
    return this.danceService.create(newdance);
  }
  @ApiOperation({
    summary: 'Get information of dance with id {id}',
    operationId: 'Getdance',
  })
  @ApiResponse({ status: 200, type: DanceDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DanceDto> {
    return this.danceService.findOne(id);
  }

  @ApiOperation({
    summary: 'Delete dance with id {id}',
    operationId: 'Deletedance',
  })
  @ApiResponse({ status: 200, type: DanceDto })
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<DanceDto> {
    return this.danceService.deleteOne(id);
  }

  @ApiOperation({ summary: 'update dance', operationId: 'Updatedance' })
  @ApiBody({ type: DanceDto })
  @Put()
  async update(
    @Param('id') id: string,
    @Body() player: DanceDto,
  ): Promise<DanceDto> {
    return this.danceService.update(id, player);
  }
}
