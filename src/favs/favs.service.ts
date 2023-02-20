import { Injectable, HttpException } from '@nestjs/common';
import {
  FavoritesRepsonse,
  FavsResponse,
} from './interfaces/favs.response.interace';
import {
  favsMessages,
  trackMessages,
  albumMessages,
  artistMessages,
} from '../messages/error.messages';
import { constants as httpStatus } from 'http2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Favs, FAVS_TYPE } from './entities/favs.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Favs)
    private favsRepository: Repository<Favs>,
  ) {}

  async getFavorites() {
    try {
      const favs = await this.getFavsIds();

      const result: FavsResponse = {
        tracks:
          favs.trackIds.length === 0
            ? []
            : await this.trackRepository
                .createQueryBuilder('track')
                .where('track.id IN (:...tracks)', {
                  tracks: favs.trackIds,
                })
                .getMany(),
        artists:
          favs.artistIds.length === 0
            ? []
            : await this.artistRepository
                .createQueryBuilder('artist')
                .where('artist.id IN (:...artists)', {
                  artists: favs.artistIds,
                })
                .getMany(),
        albums:
          favs.albumIds.length === 0
            ? []
            : await this.albumRepository
                .createQueryBuilder('album')
                .where('album.id IN (:...albums)', {
                  albums: favs.albumIds,
                })
                .getMany(),
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  async addTrack(id: string) {
    try {
      const favs = await this.getFavsIds();
      const track = await this.trackRepository.findOneBy({ id });

      if (!track) {
        throw new HttpException(
          trackMessages.TRACK_NOT_FOUND,
          httpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY,
        );
      }

      if (!favs.trackIds.find((el) => el === track.id)) {
        const newEntity: Favs = {
          id: uuidv4(),
          type: FAVS_TYPE.TRACK,
          artistId: null,
          albumId: null,
          trackId: id,
        };

        const newTrack = await this.favsRepository.create({
          ...newEntity,
        });

        await this.favsRepository.save(newTrack);

        return `This track ${id} was added to favorites`;
      } else {
        return `This track ${id} alredy exists in favorites and not add to favorites again`;
      }
    } catch (error) {
      throw error;
    }
  }

  async removeTrack(id: string) {
    const track = await this.favsRepository.findOneBy({ trackId: id });

    if (!track) {
      throw new HttpException(
        favsMessages.TRACK_NOT_IN_FAVS,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.favsRepository.delete({ id: track.id });
  }

  async addAlbum(id: string) {
    try {
      const favs = await this.getFavsIds();
      const album = await this.albumRepository.findOneBy({ id });

      if (!album) {
        throw new HttpException(
          albumMessages.ALBUM_NOT_FOUND,
          httpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY,
        );
      }

      if (!favs.albumIds.find((el) => el === album.id)) {
        const newEntity: Favs = {
          id: uuidv4(),
          type: FAVS_TYPE.ALBUM,
          artistId: null,
          albumId: id,
          trackId: null,
        };

        const newAlbum = await this.favsRepository.create({
          ...newEntity,
        });

        await this.favsRepository.save(newAlbum);

        return `This album ${id} was added to favorites`;
      } else {
        return `This album ${id} alredy exists in favorites and not add to favorites again`;
      }
    } catch (error) {
      throw error;
    }
  }

  async removeAlbum(id: string) {
    const album = await this.favsRepository.findOneBy({ albumId: id });

    if (!album) {
      throw new HttpException(
        favsMessages.ALBUM_NOT_IN_FAVS,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.favsRepository.delete({ id: album.id });
  }

  async addArtist(id: string) {
    try {
      const favs = await this.getFavsIds();
      const artist = await this.artistRepository.findOneBy({ id });

      if (!artist) {
        throw new HttpException(
          artistMessages.ARTIST_NOT_FOUND,
          httpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY,
        );
      }

      if (!favs.artistIds.find((el) => el === artist.id)) {
        const newEntity: Favs = {
          id: uuidv4(),
          type: FAVS_TYPE.ARTIST,
          artistId: id,
          albumId: null,
          trackId: null,
        };

        const newArtist = await this.favsRepository.create({
          ...newEntity,
        });

        await this.favsRepository.save(newArtist);

        return `This artist ${id} was added to favorites`;
      } else {
        return `This artist ${id} alredy exists in favorites and not add to favorites again`;
      }
    } catch (error) {
      throw error;
    }
  }

  async removeArtist(id: string) {
    const artist = await this.favsRepository.findOneBy({ artistId: id });

    if (!artist) {
      throw new HttpException(
        favsMessages.ARTIST_NOT_IN_FAVS,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.favsRepository.delete({ id: artist.id });
  }

  async getFavsIds() {
    const favsCollection = await this.favsRepository.find();

    const response: FavoritesRepsonse = {
      artistIds: [],
      albumIds: [],
      trackIds: [],
    };

    favsCollection.forEach((entity) => {
      switch (entity.type) {
        case FAVS_TYPE.ARTIST:
          response.artistIds.push(entity.artistId);
          break;
        case FAVS_TYPE.ALBUM:
          response.albumIds.push(entity.albumId);
          break;
        case FAVS_TYPE.TRACK:
          response.trackIds.push(entity.trackId);
          break;
        default:
          break;
      }
    });

    return response;
  }
}
