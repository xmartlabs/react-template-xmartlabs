import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "./api-error";
import { ApiService } from "./api-service";

enum Method {
  get = "get",
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
}

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

afterEach(() => {
  fetchMock.mockClear();
});

describe("ApiService", () => {
  const sharedExamples = (method: Method) => {
    const url = "domain.com/path/to/resource";
    const networkError = {
      ok: false,
      json: () => ({
        response: {
          data: {
            code: 1001,
            message: "error message",
          },
        },
      }),
    };
    const okResponse = {
      ok: true,
      json: () => ({
        response: {
          data: {
            foo: "foo",
            bar: 10,
          },
        },
      }),
    };
    const setupTest = () => ApiService[method](url);

    it(`calls the '${method}' method`, async () => {
      fetchMock.mockResolvedValueOnce(okResponse);
      await setupTest();

      expect(fetch).toHaveBeenCalledOnce();
    });

    it("creates an ApiError when a network error is raised", async () => {
      fetchMock.mockResolvedValueOnce(networkError);
      try {
        await setupTest();
        throw new Error("Error was not caught");
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
      }
    });
  };

  Object.values(Method).forEach(sharedExamples);
});
