export const DB_ERROR_NAME = 'DbError';
export const FIELD_REQUIRED_ERROR_NAME = 'FieldRequiredError';

export const ENTITY_NOT_FOUND_MESSAGE = 'Entity with received id wasn`t found';
export const INVALID_ID_MESSAGE = 'Entity id is invalid (not uuid format)';
export const FIELD_REQUIRED_MESSAGE = 'All fields in request body are required';
export const SERVER_SIDE_ERROR_MESSAGE = 'Something went wrong';

export class DbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = DB_ERROR_NAME;
  }
}

export class FieldRequiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = FIELD_REQUIRED_ERROR_NAME;
  }
}