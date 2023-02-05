import { Injectable, HttpException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryArtistsStore } from './store/in-memory-artists.store';
import { artistMessages } from '../messages/error.messages';
import { constants as httpStatus } from 'http2';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private store: InMemoryArtistsStore) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    await this.store.create(artist);

    return artist;
  }

  async findAll() {
    const artists = await this.store.findAll();

    return artists;
  }

  async findOne(id: string) {
    const user = await this.store.findOne(id);

    if (!user) {
      throw new HttpException(
        artistMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return user;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.store.findOne(id);

    if (!artist) {
      throw new HttpException(
        artistMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    await this.store.update(artist.id, artist);

    return artist;
  }

  async remove(id: string) {
    const artist = await this.store.findOne(id);

    if (!artist) {
      throw new HttpException(
        artistMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.store.remove(artist.id);
  }
}
