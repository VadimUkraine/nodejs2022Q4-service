import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { constants as httpStatus } from 'node:http2';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
