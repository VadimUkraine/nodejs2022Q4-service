import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Track, Album, Artist])],
})
export class TrackModule {}
