const userMessages = {
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Old password is invalid',
};

const artistMessages = {
  ARTIST_NOT_FOUND: 'Artist not found',
};

const albumMessages = {
  ALBUM_NOT_FOUND: 'Album not found',
  ARTIST_ID_NOT_UUID: 'Artist ID is not UUID',
};

const trackMessages = {
  TRACK_NOT_FOUND: 'Track not found',
  ARTIST_ID_NOT_UUID: 'Artist ID is not UUID',
  ALBUM_ID_NOT_UUID: 'Album ID is not UUID',
};

const favsMessages = {
  TRACK_NOT_IN_FAVS: 'There is no such track in favorites',
  ALBUM_NOT_IN_FAVS: 'There is no such album in favorites',
  ARTIST_NOT_IN_FAVS: 'There is no such artist in favorites',
};

const tokenMessages = {
  NO_REFRESH_TOKEN: 'No refresh token in body',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid or expired',
};

export {
  userMessages,
  artistMessages,
  albumMessages,
  trackMessages,
  favsMessages,
  tokenMessages,
};
