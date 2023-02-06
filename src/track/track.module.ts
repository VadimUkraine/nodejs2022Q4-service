import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTracksStore } from './store/in-memory-tracks.store';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryTracksStore],
  exports: [TrackService],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule)],
})
export class TrackModule {}
