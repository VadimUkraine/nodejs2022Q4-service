import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistsStore } from './store/in-memory-artists.store';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistsStore],
})
export class ArtistModule {}
