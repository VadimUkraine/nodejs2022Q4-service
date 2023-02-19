import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { InMemoryFavoritesStore } from './store/in-memory-favs.store';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  // controllers: [FavsController],
  // providers: [FavsService, InMemoryFavoritesStore],
  // imports: [TrackModule, AlbumModule, ArtistModule],
})
export class FavsModule {}
