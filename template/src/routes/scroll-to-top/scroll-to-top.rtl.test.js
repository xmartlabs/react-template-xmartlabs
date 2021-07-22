import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockScrollTo } from 'tests/support/window-mock';
import { ScrollToTop } from './scroll-to-top';

describe('ScrollToTop', () => {
  const location = {
    pathname: '/path',
    hash: '#hash',
    search: '?param1=value1',
  };
  const setupTest = (children = 'Children') => render(
    <ScrollToTop location={location}>
      {children}
    </ScrollToTop>,
  );
  describe('when rendering', () => {
    it('renders correctly', () => {
      expect(setupTest).not.toThrow();
    });

    it('renders its children correctly', () => {
      const children = 'Other Children';
      setupTest(children);

      expect(() => screen.getByText(children)).not.toThrow();
    });

    it('does not call window.scrollTo', () => {
      setupTest();

      expect(mockScrollTo).not.toHaveBeenCalled();
    });
  });

  describe('when updating', () => {
    it('calls window.scrollTo', () => {
      const { rerender } = setupTest();

      const newLocation = {
        pathname: '/another/path',
        hash: '#hash',
        search: '?param1=value1',
      };
      rerender(<ScrollToTop location={newLocation}>Children</ScrollToTop>);

      expect(mockScrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
