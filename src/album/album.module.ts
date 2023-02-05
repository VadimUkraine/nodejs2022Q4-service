import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumsStore } from './store/in-memory-albums.store';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryAlbumsStore],
  exports: [AlbumService],
  imports: [TrackModule],
})
export class AlbumModule {}
