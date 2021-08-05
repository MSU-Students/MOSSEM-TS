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
import { EquipmentDto } from '../dto/equipment.dto';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: EquipmentDto })
  @ApiOperation({ summary: 'Add new equipment', operationId: 'AddEquipment' })
  @ApiResponse({ status: 200, type: EquipmentDto })
  @Post()
  async create(@Body() newEquipment: EquipmentDto): Promise<EquipmentDto> {
    return this.equipmentService.create(newEquipment);
  }

  @ApiOperation({
    summary: 'Get information of all equipment',
    operationId: 'GetEquipments',
  })
  @ApiResponse({ status: 200, isArray: true, type: EquipmentDto })
  @Get()
  async findAll(): Promise<EquipmentDto[]> {
    return (await this.equipmentService.findAll());
  }

  @ApiOperation({
    summary: 'Get information of equipment with id {id}',
    operationId: 'GetEquipment',
  })
  @ApiResponse({ status: 200, type: EquipmentDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EquipmentDto> {
    return this.equipmentService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete equipment with id {id}',
    operationId: 'DeleteEquipment',
  })
  @ApiResponse({ status: 200, type: EquipmentDto })
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<EquipmentDto> {
    return this.equipmentService.deleteOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update equipment', operationId: 'UpdateEquipment' })
  @ApiBody({ type: EquipmentDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() player: EquipmentDto,
  ): Promise<EquipmentDto> {
    return this.equipmentService.update(id, player);
  }
}
