import {
  describe, expect, it, vi,
} from 'vitest';
import { ApiError } from './api-error';
import { ApiService, HttpMethod } from './api-service';

const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockPatch = vi.fn();
const mockDelete = vi.fn();
const mockDictionary = {
  get: mockGet,
  post: mockPost,
  put: mockPut,
  patch: mockPatch,
  delete: mockDelete,
};
vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: () => mockGet(),
      post: () => mockPost(),
      put: () => mockPut(),
      patch: () => mockPatch(),
      delete: () => mockDelete(),
    }),
  },
}));

describe('ApiService', () => {
  const sharedExamples = (method: HttpMethod) => {
    const url = 'domain.com/path/to/resource';
    const networkError = {
      response: {
        data: {
          code: 1001,
          message: 'error message',
        },
      },
    };
    const setupTest = () => ApiService[method](url);

    it(`calls the '${method}' method of axios`, async () => {
      await setupTest();

      expect(mockDictionary[method]).toHaveBeenCalledTimes(1);
    });

    it('creates an ApiError when a network error is raised', async () => {
      mockDictionary[method].mockRejectedValueOnce(networkError);
      try {
        await setupTest();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        return;
      }
      throw new Error('Error was not caught');
    });
  };

  Object.values(HttpMethod).forEach(sharedExamples);
});
