import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
/* Importing this library gives us more matchers for the expects, for example toBeInTheDocument */
import '@testing-library/jest-dom';
import { RickAndMortyForm } from './rick-and-morty-form';

/* For this test case scenario we'll focus on using the FireEvent methods from RTL!
* These methods will help us to interact with the page like a user would do.
* We'll also catch API Errors and form errors. */

/* Here's another example of reusing code, fetching all elements (that are visible and static)
* is a task that we might end up doing in a bunch of our tests, so it's better to encapsulate it
* in a method, and hey why not render it since we are encapsulating logic? */
const setup = () => {
  const utils = render(<RickAndMortyForm />);
  /* Check the queries priorities here https://testing-library.com/docs/queries/about/#priority
  * it's useful when deciding which ones to use.
  * For Forms we have two great options, getByRole (using the accessibility tree) and getByLabelText
  * which uses the associated label to find the input, very similar to how a user would find an
  * input, right?
  * For example purposes, we'll use both!
  * Psss! Using Chrome Dev Tools Inspect element, and holding the cursor on top of the input will
  * give you a role and name of your element :). */
  const name = utils.getByRole('textbox', { name: 'Name' });
  const gender = utils.getByRole('textbox', { name: 'Gender' });
  const species = utils.getByLabelText('Species');
  const status = utils.getByLabelText('Status');
  const type = utils.getByRole('textbox', { name: 'Type' });
  /* We could also use getByText for the button */
  const create = utils.getByRole('button', { name: 'Create character' });

  /* Let's make it accessible to our test and also the utils in case we might need to use some of
  * the queries from the render */
  return {
    name,
    gender,
    species,
    type,
    create,
    status,
    ...utils,
  };
};

/* We'll probably fill the form multiple times, so let's also take it to a common method here.
* For this case, we don't care with what and which fields are filled so we don't need parameters but
* if it's relevant to your test case, just add them here.
* Oh and here it also comes handy having an object with all our elements :). */
const fillForm = (form) => {
  fireEvent.change(form.name, { target: { value: 'Botmattic' } });
  fireEvent.change(form.gender, { target: { value: 'Unknown' } });
  fireEvent.change(form.species, { target: { value: 'Human' } });
  fireEvent.change(form.status, { target: { value: 'Alive' } });
  fireEvent.change(form.type, { target: { value: 'Bot' } });

  fireEvent.click(form.create);
};

describe('Rick and Morty character creation page', () => {
  describe('Happy case flow', () => {
    it('Submits correctly a new character', async () => {
      /* There are scenarios where we can't get an element by any of the queries, that's when we use
      * the ByTestId query, we are going to use to get the message box (div) to see validate if it
      * has the right class on it.
      * To get it work, add the data-testid attribute on the HTML element we want.
      * It can be customized, to use a different attribute in case you might want something more
      * discrete. */
      const utils = setup();
      const { getByTestId, getByText } = utils;

      fillForm(utils);

      await waitFor(() => {
        expect(getByTestId('testBox')).toBeInTheDocument();
        expect(getByTestId('testBox')).toHaveClass('success', { exact: false });
        expect(getByText('Hooray! Your character (Botmattic) was "created" successfully!'));
      });
    });
  });
  describe('Error case flow', () => {
    it('Displays the required message on each field that is actually required', () => {
      const { create, getAllByText } = setup();

      fireEvent.click(create);

      expect(getAllByText('Constraints not satisfied').length).toBe(4);
    });

    it('Displays an error message box when the API call fails', async () => {
      const utils = setup();
      const { getByTestId, getByText } = utils;
      localStorage.setItem('errorCode', '500');

      fillForm(utils);

      await waitFor(() => {
        expect(getByTestId('testBox')).toBeInTheDocument();
        expect(getByTestId('testBox')).toHaveClass('error', { exact: false });
        expect(getByText('Oh no! There was a problem while creating your character, try again later!'));
      });
    });
  });
});
