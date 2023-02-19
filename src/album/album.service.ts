import { Injectable, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { constants as httpStatus } from 'http2';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { albumMessages, artistMessages } from '../messages/error.messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';


@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findAll() {
    const albums = await this.albumRepository.find();

    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        albumMessages.ALBUM_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    const notArtisIdIsUUID = !uuidValidate(artistId);  
  
    if (artistId !== null && notArtisIdIsUUID) {
      throw new HttpException(
        albumMessages.ARTIST_ID_NOT_UUID,
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

    const newAlbum = this.albumRepository.create({
      id: uuidv4(),
      ...createAlbumDto,
    });

    return await this.albumRepository.save(newAlbum);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { artistId } = updateAlbumDto;
    const notArtisIdIsUUID = !uuidValidate(artistId);
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        albumMessages.ALBUM_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    if (artistId !== null && notArtisIdIsUUID) {
      throw new HttpException(
        albumMessages.ARTIST_ID_NOT_UUID,
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

    await this.albumRepository.update(id, { ...updateAlbumDto });

    return await this.albumRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        albumMessages.ALBUM_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.albumRepository.delete({ id });
  }
}
