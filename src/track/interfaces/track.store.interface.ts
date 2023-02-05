import { TrackInterface } from './track.interface';

export interface TracksStore {
  create(track: TrackInterface): Promise<void>;

  findAll(): Promise<TrackInterface[]>;

  findOne(id: string): Promise<TrackInterface | undefined>;

  update(id: string, user: TrackInterface): Promise<void>;

  remove(id: string): Promise<void>;
}
