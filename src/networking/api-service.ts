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
  static _raiseError(data: any) {
    throw new ApiError({
      code: data?.code || ErrorCode.UNEXPECTED_ERROR,
      status: data?.status,
      message: data?.message || "An unexpected error has occurred",
    });
  }

  async _sendRequest<ReturnType>(
    method: HttpMethod,
    path: string,
    config: RequestInit = {},
  ) {
    const updatedConfig = { ...config };
    updatedConfig.headers = { ...this.addedHeaders, ...(config.headers || {}) };
    const fullURL = new URL(path, constants.apiBaseURL);
    const response = await fetch(fullURL, {
      method,
      ...updatedConfig,
    });
    let data;
    try {
      data = (await response.json()) as Promise<ReturnType>;
    } catch (error) {
      // eslint-disable-next-line no-underscore-dangle
      ApiServiceClass._raiseError(error);
    }
    if (!response.ok) {
      // eslint-disable-next-line no-underscore-dangle
      ApiServiceClass._raiseError(data);
    }
    return data;
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
