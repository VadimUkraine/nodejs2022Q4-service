import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistsStore } from './store/in-memory-artists.store';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistsStore],
  imports: [AlbumModule],
})
export class ArtistModule {}
