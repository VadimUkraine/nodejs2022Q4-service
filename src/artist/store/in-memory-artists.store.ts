import { Injectable } from '@nestjs/common';
import { ArtistInterface } from '../interfaces/artist.interface';
import { ArtistsStore } from '../interfaces/artist.store.interface';

@Injectable()
export class InMemoryArtistsStore implements ArtistsStore {
  private readonly artists: ArtistInterface[] = [];

  create = async (artist: ArtistInterface): Promise<void> => {
    this.artists.push(artist);
  };

  findAll = async (): Promise<ArtistInterface[]> => {
    return this.artists;
  };

  findOne = async (id: string): Promise<ArtistInterface | undefined> => {
    return this.artists.find((artist) => artist.id === id);
  };

  update = async (id: string, artist: ArtistInterface): Promise<void> => {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = artist;
  };

  remove = async (id: string): Promise<void> => {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
  };
}
