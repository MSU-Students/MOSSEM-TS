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
import { SongDto } from '../dto/song.dto';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: SongDto })
  @ApiOperation({ summary: 'Add new song', operationId: 'AddSong' })
  @ApiResponse({ status: 200, type: SongDto })
  @Post()
  async create(@Body() newSong: SongDto): Promise<SongDto> {
    return this.songService.create(newSong);
  }

  @ApiOperation({
    summary: 'Get information of all song',
    operationId: 'GetSongs',
  })
  @ApiResponse({ status: 200, isArray: true, type: SongDto })
  @Get()
  async findAll(): Promise<SongDto[]> {
    return (await this.songService.findAll());
  }

  @ApiOperation({
    summary: 'Get information of song with id {id}',
    operationId: 'GetSong',
  })
  @ApiResponse({ status: 200, type: SongDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SongDto> {
    return this.songService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete song with id {id}',
    operationId: 'DeleteSong',
  })
  @ApiResponse({ status: 200, type: SongDto })
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<SongDto> {
    return this.songService.deleteOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update song', operationId: 'UpdateSong' })
  @ApiBody({ type: SongDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() player: SongDto,
  ): Promise<SongDto> {
    return this.songService.update(id, player);
  }
}
