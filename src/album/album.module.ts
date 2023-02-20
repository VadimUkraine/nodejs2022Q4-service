import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Album, Artist])],
})
export class AlbumModule {}
