import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumsStore } from './store/in-memory-albums.store';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryAlbumsStore],
  exports: [AlbumService],
  imports: [forwardRef(() => TrackModule), forwardRef(() => ArtistModule)],
})
export class AlbumModule {}
