import { ArtistInterface } from '../../artist/interfaces/artist.interface';
import { AlbumInterface } from '../../album/interfaces/album.interface';
import { TrackInterface } from '../../track/interfaces/track.interface';

export interface FavoritesRepsonse {
  artists: ArtistInterface[];
  albums: AlbumInterface[];
  tracks: TrackInterface[];
}
