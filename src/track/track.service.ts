import { Injectable, HttpException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { constants as httpStatus } from 'http2';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { trackMessages, artistMessages, albumMessages } from '../messages/error.messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async findAll() {
    const tracks = await this.tracksRepository.find();

    return tracks;
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        trackMessages.TRACK_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return track;
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
      const artist = await this.artistRepository.findOneBy({ id: artistId });

      if (!artist) {
        throw new HttpException(
          artistMessages.ARTIST_NOT_FOUND,
          httpStatus.HTTP_STATUS_NOT_FOUND,
        );
      }
    }

    if (albumId !== null && notAlbumIdIsUUID) {
      throw new HttpException(
        trackMessages.ALBUM_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    if (albumId !== null) {
      const album = await this.albumRepository.findOneBy({ id: albumId });

      if (!album) {
        throw new HttpException(
          albumMessages.ALBUM_NOT_FOUND,
          httpStatus.HTTP_STATUS_NOT_FOUND,
        );
      }
    }

    const newTrack = await this.tracksRepository.create({
      id: uuidv4(),
      ...createTrackDto,
    });

    return await this.tracksRepository.save(newTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { artistId, albumId } = updateTrackDto;
    const notArtisdIdIsUUID = !uuidValidate(artistId);
    const notAlbumIdIsUUID = !uuidValidate(albumId);

    const track = await this.tracksRepository.findOneBy({ id })

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
      const artist = await this.artistRepository.findOneBy({ id: artistId });

      if (!artist) {
        throw new HttpException(
          artistMessages.ARTIST_NOT_FOUND,
          httpStatus.HTTP_STATUS_NOT_FOUND,
        );
      }
    }

    if (albumId !== null && notAlbumIdIsUUID) {
      throw new HttpException(
        trackMessages.ALBUM_ID_NOT_UUID,
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    if (albumId !== null) {
      const album = await this.albumRepository.findOneBy({ id: albumId });

      if (!album) {
        throw new HttpException(
          albumMessages.ALBUM_NOT_FOUND,
          httpStatus.HTTP_STATUS_NOT_FOUND,
        );
      }
    }

    await this.tracksRepository.update(id, {...updateTrackDto });

    return await this.tracksRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        trackMessages.TRACK_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.tracksRepository.delete({ id });
  }
}
