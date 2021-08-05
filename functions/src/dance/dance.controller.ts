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
import { DanceDto } from '../dto/dance.dto';
import { DanceService } from './dance.service';

@Controller('dance')
export class DanceController {
  constructor(private readonly danceService: DanceService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: DanceDto })
  @ApiOperation({ summary: 'Add new dance', operationId: 'AddDance' })
  @ApiResponse({ status: 200, type: DanceDto })
  @Post()
  async create(@Body() newDance: DanceDto): Promise<DanceDto> {
    return this.danceService.create(newDance);
  }

  @ApiOperation({
    summary: 'Get information of all dance',
    operationId: 'GetDances',
  })
  @ApiResponse({ status: 200, isArray: true, type: DanceDto })
  @Get()
  async findAll(): Promise<DanceDto[]> {
    return (await this.danceService.findAll()).map((g) => {
      return { ...g, stacks: undefined };
    });
  }

  @ApiOperation({
    summary: 'Get information of dance with id {id}',
    operationId: 'GetDance',
  })
  @ApiResponse({ status: 200, type: DanceDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DanceDto> {
    return this.danceService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete dance with id {id}',
    operationId: 'DeleteDance',
  })
  @ApiResponse({ status: 200, type: DanceDto })
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<DanceDto> {
    return this.danceService.deleteOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update dance', operationId: 'UpdateDance' })
  @ApiBody({ type: DanceDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() player: DanceDto,
  ): Promise<DanceDto> {
    return this.danceService.update(id, player);
  }
}
