import { Injectable, HttpException, Inject, forwardRef } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryTracksStore } from './store/in-memory-tracks.store';
import { constants as httpStatus } from 'http2';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { trackMessages } from '../messages/error.messages';
import { TrackInterface } from './interfaces/track.interface';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    private store: InMemoryTracksStore,
  ) {}

  async getTracksByIds(tracks: string[]) {
    const tracksFromMemory = await this.store.findAll();

    return tracksFromMemory.filter((track: TrackInterface) =>
      tracks.includes(track.id),
    );
  }

  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;
    const notArtisdIdIsUUID = !uuidValidate(artistId);
    const notAlbumIdIsUUID = !uuidValidate(albumId);

    if (artistId !== null && notArtisdIdIsUUID) {
      throw new HttpException(
        trackMessages.ARTIST_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    if (artistId !== null) {
      await this.artistService.findOne(artistId);
    }

    if (albumId !== null && notAlbumIdIsUUID) {
      throw new HttpException(
        trackMessages.ALBUM_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    if (albumId !== null) {
      await this.albumService.findOne(albumId);
    }

    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };

    await this.store.create(track);

    return track;
  }

  async findAll() {
    const tracks = await this.store.findAll();

    return tracks;
  }

  async findOne(id: string) {
    const track = await this.store.findOne(id);

    if (!track) {
      throw new HttpException(
        trackMessages.TRACK_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { artistId, albumId } = updateTrackDto;
    const notArtisdIdIsUUID = !uuidValidate(artistId);
    const notAlbumIdIsUUID = !uuidValidate(albumId);

    const track = await this.store.findOne(id);

    if (!track) {
      throw new HttpException(
        trackMessages.TRACK_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    if (artistId !== null && notArtisdIdIsUUID) {
      throw new HttpException(
        trackMessages.ARTIST_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    if (artistId !== null) {
      await this.artistService.findOne(artistId);
    }

    if (albumId !== null && notAlbumIdIsUUID) {
      throw new HttpException(
        trackMessages.ALBUM_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    if (albumId !== null) {
      await this.albumService.findOne(albumId);
    }

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    await this.store.update(updatedTrack.id, updatedTrack);

    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.store.findOne(id);

    if (!track) {
      throw new HttpException(
        trackMessages.TRACK_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.store.remove(track.id);
  }
}
