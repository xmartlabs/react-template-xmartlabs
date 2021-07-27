import { rest } from 'msw';
import { API_ROUTES } from '../networking/api-routes';
import { MockedCharacters } from './characters/characters';

/* This should be using constants.apiBaseURL but for some reason is not picking the test
 env file */
const url = 'http://localhost/';

/* We mock here our request values, */
export const handlers = [
  rest.get(url + API_ROUTES.CHARACTERS, (req, res, ctx) => {
    /* Later we will define set this variable in our test */
    const errorCode = localStorage.getItem('errorCode');

    if (errorCode === '500') {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          message: 'Unexpected error',
        }),
      );
    }

    if (errorCode === '404') {
      return res(
        ctx.status(404),
        ctx.json({
          code: 404,
        }),
      );
    }

    return res(ctx.json({
      results: MockedCharacters,
    }));
  }),

  rest.post(url + API_ROUTES.CHARACTERS, (req, res, ctx) => {
    const errorCode = localStorage.getItem('errorCode');
    if (errorCode === '500') {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          message: 'Unexpected error',
        }),
      );
    }

    return res(ctx.json({ message: 'All ok' }));
  }),
];
