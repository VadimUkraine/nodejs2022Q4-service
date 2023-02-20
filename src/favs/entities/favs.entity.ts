import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

export enum FAVS_TYPE {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
}

@Entity()
export class Favs {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: FAVS_TYPE,
  })
  type: FAVS_TYPE;

  @Column('uuid', { nullable: true })
  @ManyToOne(() => Track, (track) => track.id, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'trackId' })
  trackId: string | null;

  @Column('uuid', { nullable: true })
  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;

  @Column('uuid', { nullable: true })
  @ManyToOne(() => Album, (album) => album.id, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null;
}
