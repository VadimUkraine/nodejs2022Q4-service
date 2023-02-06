import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistsStore } from './store/in-memory-artists.store';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistsStore],
  imports: [forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
