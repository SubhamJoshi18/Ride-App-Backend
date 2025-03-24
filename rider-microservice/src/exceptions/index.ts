import { HTTP_STATUS } from '../constants/http-status.constant';

export class HttpExceptions extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.name = 'HttpException';

    Object.setPrototypeOf(this, new.target.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getMessage(): string {
    return this.message;
  }
}

export class UnauthorizedException extends HttpExceptions {
  constructor(statusCode: number | null, message: string) {
    super(
      statusCode ?? HTTP_STATUS.UNAUTHORIZED.CODE,
      message || HTTP_STATUS.UNAUTHORIZED.MESSAGE,
    );
    this.name = 'UnAuthorizedException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundException extends HttpExceptions {
  constructor(statusCode: number | null, message: string) {
    super(
      statusCode ?? HTTP_STATUS.NOT_FOUND.CODE,
      message || HTTP_STATUS.NOT_FOUND.MESSAGE,
    );
    this.name = 'NotFoundException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestException extends HttpExceptions {
  constructor(statusCode: number | null, message: string) {
    super(
      statusCode ?? HTTP_STATUS.BAD_REQUEST.CODE,
      message || HTTP_STATUS.BAD_REQUEST.MESSAGE,
    );
    this.name = 'BadRequestException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationException extends HttpExceptions {
  constructor(statusCode: number | null, message: string) {
    super(
      statusCode ?? HTTP_STATUS.VALIDATION_ERROR.CODE,
      message || HTTP_STATUS.VALIDATION_ERROR.MESSAGE,
    );
    this.name = 'ValidationException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DatabaseException extends HttpExceptions {
  constructor(statusCode: number | null, message: string) {
    super(
      statusCode ?? HTTP_STATUS.DATABASE_ERROR.CODE,
      message || HTTP_STATUS.DATABASE_ERROR.MESSAGE,
    );
    this.name = 'DatabaseException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class RabbitMQExceptions extends HttpExceptions {
  constructor(statusCode: number | null, message: string) {
    super(
      statusCode ?? HTTP_STATUS.BAD_REQUEST.CODE,
      message || HTTP_STATUS.DATABASE_ERROR.MESSAGE,
    );
    this.name = 'RabbitMQExceptions';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
