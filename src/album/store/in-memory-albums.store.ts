import { Injectable } from '@nestjs/common';
import { AlbumInterface } from '../interfaces/album.interface';
import { AlbumStore } from '../interfaces/album.store.interface';

@Injectable()
export class InMemoryAlbumsStore implements AlbumStore {
  private readonly albums: AlbumInterface[] = [];

  create = async (album: AlbumInterface): Promise<void> => {
    this.albums.push(album);
  };

  findAll = async (): Promise<AlbumInterface[]> => {
    return this.albums;
  };

  findOne = async (id: string): Promise<AlbumInterface | undefined> => {
    return this.albums.find((album) => album.id === id);
  };

  update = async (id: string, album: AlbumInterface): Promise<void> => {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums[index] = album;
  };

  remove = async (id: string): Promise<void> => {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
  };
}
