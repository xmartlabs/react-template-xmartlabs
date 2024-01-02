enum ErrorCode {
  // Add more error codes here
  GenericError = "10001",
}

enum ErrorStatus {
  BadRequest = 400,
  Unauthorized = 401,
  PreconditionFailed = 412,
  ServerError = 500,
}

class ApiError extends Error {
  status: number | null;

  code: number | null;

  constructor(params: RawApiError) {
    super(String(params.message));
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

export { ApiError, ErrorCode, ErrorStatus };
