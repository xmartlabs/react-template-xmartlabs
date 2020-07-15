const ERROR_CODES = {
  GENERIC_ERROR: 'genericError',
};

const ERROR_STATUSES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PRECONDITION_FAILED: 412,
  SERVER_ERROR: 500,
};

/*
  We need this identifier since Babel and other transpilers have trouble
  setting prototypes when extending native classes like `Error`. You can read
  more here: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

  Since we want to support somewhat older browsers (IE 10 and 9) we can't use
  any known workarounds for this, so we manually set a name on the error we can use.
*/
const ERROR_NAME = 'ApiError';

class ApiError extends Error {
  /*
    Checks that an error is of this type. Check the comment above
    for more info on why this is done this way.
  */
  static isApiError(error) {
    return error.name === ERROR_NAME;
  }

  constructor(params) {
    super(params.message);
    this.status = params.status;
    this.code = params.code;
    this.name = ERROR_NAME;
  }
}

export { ApiError, ERROR_CODES, ERROR_STATUSES };
