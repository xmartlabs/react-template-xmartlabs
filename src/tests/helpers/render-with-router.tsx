/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (component: JSX.Element, { route = '/' } = {}): ReturnType<typeof render> => {
  window.history.pushState({}, 'Test page', route);

  return render(component, { wrapper: BrowserRouter });
};
