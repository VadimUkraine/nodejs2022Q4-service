import { Track } from '../../track/entities/track.entity';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

export interface FavoritesRepsonse {
  artistIds: Artist['id'][];
  albumIds: Album['id'][];
  trackIds: Track['id'][];
}

export interface FavsResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
