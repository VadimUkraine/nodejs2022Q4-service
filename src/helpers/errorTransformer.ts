import { HttpException } from '@nestjs/common';
import { constants as httpStatus } from 'http2';
import {
  trackMessages,
  albumMessages,
  artistMessages,
} from '../messages/error.messages';

const errorTransformer = (error: Error) => {
  switch (error.message) {
    case trackMessages.TRACK_NOT_FOUND:
      throw new HttpException(
        trackMessages.TRACK_NOT_FOUND,
        httpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY,
      );
    case albumMessages.ALBUM_NOT_FOUND:
      throw new HttpException(
        albumMessages.ALBUM_NOT_FOUND,
        httpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY,
      );
    case artistMessages.ARTIST_NOT_FOUND:
      throw new HttpException(
        artistMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY,
      );
    default:
      throw error;
  }
};

export default errorTransformer;
