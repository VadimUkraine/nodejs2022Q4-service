import { Injectable, HttpException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artistMessages } from '../messages/error.messages';
import { constants as httpStatus } from 'http2';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async findAll() {
    const artists = await this.artistsRepository.find();

    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        artistMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistsRepository.create({
      id: uuidv4(),
      ...createArtistDto,
    });

    return await this.artistsRepository.save(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        artistMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.artistsRepository.update(id, { ...updateArtistDto });

    return await this.artistsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        artistMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.artistsRepository.delete({ id });
  }
}
