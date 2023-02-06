import { Injectable, HttpException } from '@nestjs/common';
import { InMemoryFavoritesStore } from './store/in-memory-favs.store';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesRepsonse } from './interfaces/favs.response.interace';
import { favsMessages } from '../messages/error.messages';
import { constants as httpStatus } from 'http2';
import { errorTransformer } from '../helpers';

@Injectable()
export class FavsService {
  constructor(
    private store: InMemoryFavoritesStore,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  async getFavorites() {
    const favs = await this.store.getFavorites();

    const response: FavoritesRepsonse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    response.artists = await this.artistService.getArtistsByIds(favs.artists);

    response.albums = await this.albumService.getAlbumsByIds(favs.albums);

    response.tracks = await this.trackService.getTracksByIds(favs.tracks);

    return response;
  }

  async addTrack(id: string) {
    try {
      const track = await this.trackService.findOne(id);
      const favs = await this.store.getFavorites();

      if (!favs.tracks.includes(track.id)) {
        await this.store.addTrack(track.id);

        return `This track #${id} was added to favorites`;
      } else {
        return `This track #${id} alredy exists in favorites and not add to favorites again`;
      }
    } catch (error) {
      errorTransformer(error);
    }
  }

  async removeTrack(id: string) {
    const { tracks } = await this.store.getFavorites();

    const index = tracks.findIndex((trackID: string) => trackID === id);

    if (index !== -1) {
      this.store.removeTrack(index);
    }

    if (index === -1) {
      throw new HttpException(
        favsMessages.TRACK_NOT_IN_FAVS,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.albumService.findOne(id);
      const favs = await this.store.getFavorites();

      if (!favs.albums.includes(album.id)) {
        await this.store.addAlbum(album.id);

        return `This album #${id} was added to favorites`;
      } else {
        return `This album #${id} alredy exists in favorites and not add to favorites again`;
      }
    } catch (error) {
      errorTransformer(error);
    }
  }

  async removeAlbum(id: string) {
    const { albums } = await this.store.getFavorites();

    const index = albums.findIndex((albumID: string) => albumID === id);

    if (index !== -1) {
      this.store.removeAlbum(index);
    }

    if (index === -1) {
      throw new HttpException(
        favsMessages.ALBUM_NOT_IN_FAVS,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.artistService.findOne(id);

      const favs = await this.store.getFavorites();

      if (!favs.artists.includes(artist.id)) {
        await this.store.addArtist(artist.id);

        return `This artist #${id} was added to favorites`;
      } else {
        return `This artist #${id} alredy exists in favorites and not add to favorites again`;
      }
    } catch (error) {
      errorTransformer(error);
    }
  }

  async removeArtist(id: string) {
    const { artists } = await this.store.getFavorites();

    const index = artists.findIndex((artistID: string) => artistID === id);

    if (index !== -1) {
      this.store.removeArtist(index);
    }

    if (index === -1) {
      throw new HttpException(
        favsMessages.ARTIST_NOT_IN_FAVS,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }
  }
}
