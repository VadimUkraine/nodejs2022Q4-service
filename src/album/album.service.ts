import { Injectable, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryAlbumsStore } from './store/in-memory-albums.store';
import { constants as httpStatus } from 'http2';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { albumMessages } from '../messages/error.messages';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private store: InMemoryAlbumsStore,
    private trackService: TrackService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    const notArtisdIdIsUUID = !uuidValidate(artistId);

    if (artistId !== null && notArtisdIdIsUUID) {
      throw new HttpException(
        albumMessages.ARTIST_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    await this.store.create(album);

    return album;
  }

  async findAll() {
    const albums = await this.store.findAll();

    return albums;
  }

  async findOne(id: string) {
    const user = await this.store.findOne(id);

    if (!user) {
      throw new HttpException(
        albumMessages.ALBUM_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return user;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { artistId } = updateAlbumDto;
    const notArtisdIdIsUUID = !uuidValidate(artistId);
    const album = await this.store.findOne(id);

    if (!album) {
      throw new HttpException(
        albumMessages.ALBUM_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    if (artistId !== null && notArtisdIdIsUUID) {
      throw new HttpException(
        albumMessages.ARTIST_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    await this.store.update(updatedAlbum.id, updatedAlbum);

    return updatedAlbum;
  }

  async remove(id: string) {
    const album = await this.store.findOne(id);

    if (!album) {
      throw new HttpException(
        albumMessages.ALBUM_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.store.remove(album.id);

    const tracks = await this.trackService.findAll();

    for (const track of tracks) {
      if (track.albumId === album.id) {
        track.albumId = null;
        await this.trackService.update(track.id, track);
      }
    }
  }
}
