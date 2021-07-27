import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { RickAndMorty } from './rick-and-morty';
import { MockedCharacters } from '../../__mocks__/characters/characters';
/* Importing this library gives us more matchers for the expects, for example toBeInTheDocument */
import '@testing-library/jest-dom';

/* A few general pointers when testing with React Testing Library */

/* When writing tests with React Testing Library, it's preferred to make Functional Tests.
*  This means making tests that reflects users scenarios, so we should focus on how a user would
* see or interact with the page.
*
*  We usually don't test implementations because the user won't see or care about that, that's why
* we focus on events that the user will trigger (like clicking or typing) and the impact on what the
* user will see because of that.
* Another plus of not testing implementation is that, if we happen to change, for example, how we
* store the user data in the State on a form, it shouldn't break the test (Because we are using
* user events and we are not tied on how we store it).
*
* Keep close the https://testing-library.com/docs/react-testing-library/cheatsheet/
* Mostly the Which query should I use? table, it'll help to see which one fits your needs :) */

/* For this test case scenario we'll focus on a common result page!
*  The idea behind this is to mock our API Request and also mock the results, 200 OK results and
* error results.
*  You can mock the results by using an actual API call from your production or test environment,
* just open your browser's DevTools, copy the result from the API call, format it and create here
* a mock file :).
* If for some reason you can't get that info, you can talk with the BE team to give you an example
* of what to expect in that API call. */

/* Try to use methods to encapsulate repetitive test logic that we might encounter, like testing
* and waiting for a loader. */
const pageLoad = async (utils) => {
  /* When trying to choose which query use, try always thinking on using a query that reflects
* what the user might see */
  utils.getByRole('progressbar', { name: 'Loading' });

  /* waitFor (Promise) retry the function within until it stops throwing or times out */
  await waitFor(() => utils.getByText('Wubba lubba dub dub test!'));

  /* queryBy allows us to not get a throw error when we don't find an element, useful when we need
  * to test that an element should not be present */
  expect(utils.queryByRole('progressbar', { name: 'Loading' })).toBeNull();
};

describe('Rick and Morty result page', () => {
  describe('Happy cases flows', () => {
    it('Displays correctly all characters', async () => {
      const utils = render(<RickAndMorty />);
      await pageLoad(utils);

      /* Since we are using mocked values, we can test if we are currently displaying all expected
      * information */
      MockedCharacters.forEach((character) => {
        expect(utils.getByText(character.name)).toBeInTheDocument();
        /* We probably find many of characters with the same species, so we are good if we find at
        * least one of them. */
        expect(utils.getAllByText(character.species, { exact: false }).length).toBeGreaterThan(0);
        expect(utils.getAllByText(character.gender).length).toBeGreaterThan(0);

        expect(utils.getAllByText(character.status).length).toBeGreaterThan(0);
      });
    });

    it('Changes the character status to alive or dead depending of the value', async () => {
      const utils = render(<RickAndMorty />);
      await pageLoad(utils);

      /* We can also test if a certain style should be different depending of the info we handle,
      * * like for example if the character is alive, it should have the css class alive instead of
      * * dead.
      * * Here we only change the color of text which is not a big deal but in other scenarios where
      * * the changes are more significant for the user this could be useful. */
      utils.getAllByText('Alive').forEach((status) => {
        /* Due to css modules, we can't use exact = true */
        expect(status).toHaveClass('alive', { exact: false });
      });
      utils.getAllByText('Dead').forEach((status) => {
        expect(status).toHaveClass('dead', { exact: false });
      });
    });

    /* We know this since we have mocked data, it might not be relevant for this scenario but it
    * could for another scenario */
    it('Knows how many humans, aliens, males, females and unknown are in the page', async () => {
      const utils = render(<RickAndMorty />);
      await pageLoad(utils);

      /* We use exact false here because the text is broken up in multiple elements, like this:
      *
       -

      Human
      * just remove the exact false and you'll see the error in the console.
      * So it makes sense for this case that we don't need for it to be that exact
      * Take in consideration that you can also use regex for matching texts
      * More info: https://testing-library.com/docs/react-testing-library/cheatsheet#text-match-options */

      expect(utils.getAllByText('Human', { exact: false }).length).toBe(19);
      expect(utils.getAllByText('Alien', { exact: false }).length).toBe(8);
      expect(utils.getAllByText('Male', { exact: false }).length).toBe(19);
      expect(utils.getAllByText('Female', { exact: false }).length).toBe(4);
      expect(utils.getAllByText('Unknown', { exact: false }).length).toBe(7);
    });
  });

  describe('Error cases flows', () => {
    it('Returns a 500 from the server, catches the error and displays the message', async () => {
      /* With localstorage combined with what we define in the handlers.js we can simulate errors.
      * They are contained in this test so we don't need to worry about them overlapping with
      * another error. */
      localStorage.setItem('errorCode', '500');
      const utils = render(<RickAndMorty />);
      await pageLoad(utils);

      expect(utils.getByText('Oops! We got the following problem when getting the results:')).toBeInTheDocument();
      const errorMsg = utils.getByText('Unexpected error');
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveClass('error', { exact: false });
    });

    it('Returns a 404 from the server, displays custom message', async () => {
      localStorage.setItem('errorCode', '404');
      const utils = render(<RickAndMorty />);
      await pageLoad(utils);

      expect(utils.getByText('Oops! We got the following problem when getting the results:')).toBeInTheDocument();
      const errorMsg = utils.getByText('Oh no! We could not find any Rick and Morty characters!');
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveClass('warning', { exact: false });
    });
  });
});
