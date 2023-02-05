import { Injectable } from '@nestjs/common';
import { TrackInterface } from '../interfaces/track.interface';
import { TracksStore } from '../interfaces/track.store.interface';

@Injectable()
export class InMemoryTracksStore implements TracksStore {
  private readonly tracks: TrackInterface[] = [];

  create = async (track: TrackInterface): Promise<void> => {
    this.tracks.push(track);
  };

  findAll = async (): Promise<TrackInterface[]> => {
    return this.tracks;
  };

  findOne = async (id: string): Promise<TrackInterface | undefined> => {
    return this.tracks.find((track) => track.id === id);
  };

  update = async (id: string, track: TrackInterface): Promise<void> => {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = track;
  };

  remove = async (id: string): Promise<void> => {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
  };
}
