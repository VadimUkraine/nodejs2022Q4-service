import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTracksStore } from './store/in-memory-tracks.store';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryTracksStore],
  exports: [TrackService],
})
export class TrackModule {}
