import { ApiError } from 'models/api-error';
import { ApiService } from './api-service';

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();
const mockDictionary = {
  get: mockGet,
  post: mockPost,
  put: mockPut,
  patch: mockPatch,
  delete: mockDelete,
};
jest.mock('axios', () => ({
  create: () => ({
    get: () => mockGet(),
    post: () => mockPost(),
    put: () => mockPut(),
    patch: () => mockPatch(),
    delete: () => mockDelete(),
  }),
}));

const methods = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
];

describe('ApiService', () => {
  const sharedExamples = (method) => {
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

  methods.forEach(sharedExamples);
});
