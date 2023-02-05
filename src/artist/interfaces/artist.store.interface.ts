import { ArtistInterface } from './artist.interface';

export interface ArtistsStore {
  create(artist: ArtistInterface): Promise<void>;

  findAll(): Promise<ArtistInterface[]>;

  findOne(id: string): Promise<ArtistInterface | undefined>;

  update(id: string, artist: ArtistInterface): Promise<void>;

  remove(id: string): Promise<void>;
}
