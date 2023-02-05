import { AlbumInterface } from './album.interface';

export interface AlbumStore {
  create(album: AlbumInterface): Promise<void>;

  findAll(): Promise<AlbumInterface[]>;

  findOne(id: string): Promise<AlbumInterface | undefined>;

  update(id: string, user: AlbumInterface): Promise<void>;

  remove(id: string): Promise<void>;
}
