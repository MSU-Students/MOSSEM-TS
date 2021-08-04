import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { PictureDto } from '../dto/picture.dto';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}
  @ApiBody({ type: PictureDto })
  @ApiOperation({ summary: 'Add new picture', operationId: 'AddPicture' })
  @ApiResponse({ status: 200, type: PictureDto })
  @Post()
  async create(@Body() newPicture: PictureDto): Promise<PictureDto> {
    return this.pictureService.create(newPicture);
  }

  @ApiOperation({
    summary: 'Get information of all picture',
    operationId: 'GetPictures',
  })
  @ApiResponse({ status: 200, isArray: true, type: PictureDto })
  @Get()
  async findAll(): Promise<PictureDto[]> {
    return (await this.pictureService.findAll());
  }

  @ApiOperation({
    summary: 'Get information of picture with id {id}',
    operationId: 'GetPicture',
  })
  @ApiResponse({ status: 200, type: PictureDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PictureDto> {
    return this.pictureService.findOne(id);
  }

  @ApiOperation({
    summary: 'Delete picture with id {id}',
    operationId: 'DeletePicture',
  })
  @ApiResponse({ status: 200, type: PictureDto })
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<PictureDto> {
    return this.pictureService.deleteOne(id);
  }

  @ApiOperation({ summary: 'update picture', operationId: 'UpdatePicture' })
  @ApiBody({ type: PictureDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() player: PictureDto,
  ): Promise<PictureDto> {
    return this.pictureService.update(id, player);
  }
}
