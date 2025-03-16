import HttpStatus from 'http-status-codes';

export const HTTP_STATUS = Object.freeze({
  SUCCESS: {
    CODE: HttpStatus.OK,
    MESSAGE: 'Request Success.',
  },
  UNAUTHORIZED: {
    CODE: HttpStatus.UNAUTHORIZED,
    MESSAGE: 'Authentication Error',
  },
  BAD_REQUEST: {
    CODE: HttpStatus.BAD_REQUEST,
    MESSAGE: 'Bad Request Error',
  },
  NOT_FOUND: {
    CODE: HttpStatus.NOT_FOUND,
    MESSAGE: 'Not Found Error',
  },
  INTERNAL_SERVER: {
    CODE: HttpStatus.INTERNAL_SERVER_ERROR,
    MESSAGE: 'Unhandle Internal Server Error Found',
  },
  VALIDATION_ERROR: {
    CODE: HttpStatus.UNPROCESSABLE_ENTITY,
    MESSAGE: 'Bad Request Error',
  },
  DATABASE_ERROR: {
    CODE: HttpStatus.BAD_REQUEST,
    MESSAGE: 'Database Error',
  },
});
