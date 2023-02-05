import { FavoritesInterface } from './favs.interface';

export interface FavoritesStore {
  getFavorites(): Promise<FavoritesInterface>;

  addTrack(id: string): Promise<void>;

  removeTrack(index: number): Promise<void>;

  addAlbum(id: string): Promise<void>;

  removeAlbum(index: number): Promise<void>;

  addArtist(id: string): Promise<void>;

  removeArtist(index: number): Promise<void>;
}
