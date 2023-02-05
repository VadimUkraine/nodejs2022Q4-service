import { Injectable } from '@nestjs/common';
import { FavoritesInterface } from '../interfaces/favs.interface';
import { FavoritesStore } from '../interfaces/favs.store.interface';

@Injectable()
export class InMemoryFavoritesStore implements FavoritesStore {
  private readonly favs: FavoritesInterface = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getFavorites = async (): Promise<FavoritesInterface> => {
    return this.favs;
  };

  addTrack = async (id: string): Promise<void> => {
    this.favs.tracks.push(id);
  };

  removeTrack = async (index: number): Promise<void> => {
    this.favs.tracks.splice(index, 1);
  };

  addAlbum = async (id: string): Promise<void> => {
    this.favs.albums.push(id);
  };

  removeAlbum = async (index: number): Promise<void> => {
    this.favs.albums.splice(index, 1);
  };

  addArtist = async (id: string): Promise<void> => {
    this.favs.artists.push(id);
  };

  removeArtist = async (index: number): Promise<void> => {
    this.favs.artists.splice(index, 1);
  };
}
