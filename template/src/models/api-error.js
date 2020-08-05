const ERROR_CODES = {
  GENERIC_ERROR: 'genericError',
};

const ERROR_STATUSES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PRECONDITION_FAILED: 412,
  SERVER_ERROR: 500,
};

class ApiError extends Error {
  constructor(params) {
    super(params.message);
    this.status = params.status;
    this.code = params.code;
    /*
      We need to set the prototype manually since Babel and other transpilers have trouble
      setting prototypes when extending native classes like `Error`. You can read
      more here: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work.
      That documentation is of Typescript, but seems like the issue is from Babel,
      not Typescript itself.

      Since we want to support somewhat older browsers (IE 11 for instance) we can't use
      any known workarounds for this, so we manually set a name on the error we can use.
    */
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export { ApiError, ERROR_CODES, ERROR_STATUSES };
