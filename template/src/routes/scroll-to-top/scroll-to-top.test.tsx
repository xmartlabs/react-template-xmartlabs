import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockScrollTo } from 'tests/support/window-mock';
import { history } from 'routes/routes';
import { ScrollToTop } from './scroll-to-top';

const defaultProps = {
  history,
  match: {
    params: {},
    isExact: false,
    path: '',
    url: '',
  },
};

describe('ScrollToTop', () => {
  const setupTest = (children = 'Children') => {
    const props = {
      ...defaultProps,
      location: {
        pathname: '/path',
        hash: '#hash',
        search: '?param1=value1',
        state: null,
      },
    };
    return render(
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <ScrollToTop {...props}>
        {children}
      </ScrollToTop>,
    );
  };
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

      const props = {
        ...defaultProps,
        location: {
          pathname: '/another/path',
          hash: '#hash',
          search: '?param1=value1',
          state: null,
        },
      };
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      rerender(<ScrollToTop {...props}>Children</ScrollToTop>);

      expect(mockScrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
