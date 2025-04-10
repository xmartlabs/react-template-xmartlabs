import { constants } from "config/constants";
import { ApiError } from "./api-error";
import { ErrorCode } from "./types/error-code";

enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Patch = "PATCH",
  Put = "PUT",
  Delete = "DELETE",
}

class ApiServiceClass {
  private addedHeaders: Record<string, string>;

  constructor() {
    this.addedHeaders = {
      "Content-Type": "application/json",
    };
  }

  // NOTE: `data` is of `any` type since it's most likely an instance of `Error` or
  // data that comes from the backend.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static _raiseError(data: any) {
    throw new ApiError({
      // NOTE: we need to disable these rules since there's no way for us to type the `data` object.
      /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
      code: data?.code ?? ErrorCode.UNEXPECTED_ERROR,
      status: data?.status,
      message: data?.message ?? "An unexpected error has occurred",
    });
  }

  async _sendRequest<ReturnType = void>(
    method: HttpMethod,
    path: string,
    config: RequestInit = {},
  ): Promise<ReturnType> {
    const updatedConfig = { ...config };
    updatedConfig.headers = Object.assign(
      {},
      this.addedHeaders,
      config.headers ?? {},
    );
    const fullURL = new URL(path, constants.apiBaseURL);
    const response = await fetch(fullURL, {
      method,
      ...updatedConfig,
    });
    let data = null;
    try {
      data = (await response.json()) as Promise<ReturnType>;
    } catch (error) {
      ApiServiceClass._raiseError(error);
    }
    if (!response.ok) {
      ApiServiceClass._raiseError(data);
    }
    // We need to disable these rules here since we need to trust 100% that the data that comes from
    // the wire meets the type criteria we're expecting (`ReturnType`).
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return data!;
  }

  setHeaders(newHeaders: Record<string, string>) {
    this.addedHeaders = { ...this.addedHeaders, ...newHeaders };
  }

  get<ReturnType>(path: string, config: RequestInit = {}) {
    return this._sendRequest<ReturnType>(HttpMethod.Get, path, config);
  }

  post<ReturnType>(path: string, config: RequestInit = {}) {
    return this._sendRequest<ReturnType>(HttpMethod.Post, path, config);
  }

  patch<ReturnType>(path: string, config: RequestInit = {}) {
    return this._sendRequest<ReturnType>(HttpMethod.Patch, path, config);
  }

  put<ReturnType>(path: string, config: RequestInit = {}) {
    return this._sendRequest<ReturnType>(HttpMethod.Put, path, config);
  }

  delete(path: string, config: RequestInit = {}) {
    return this._sendRequest(HttpMethod.Delete, path, config);
  }
}

const ApiService = new ApiServiceClass();

export { ApiService, HttpMethod };
