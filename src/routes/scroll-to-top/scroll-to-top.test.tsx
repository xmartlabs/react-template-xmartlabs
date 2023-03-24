import { render, screen } from '@testing-library/react';
import {
  describe, expect, it,
} from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { mockScrollTo } from 'tests/support/window-mock';
import { ScrollToTop } from './scroll-to-top';

const defaultProps = {
  match: {
    params: {},
    isExact: false,
    path: '',
    url: '',
  },
};

describe('ScrollToTop', () => {
  const setupTest = (children = <p>Children</p>) => {
    const props = {
      ...defaultProps,
      location: {
        pathname: '/path',
        hash: '#hash',
        search: '?param1=value1',
        state: null,
        key: 'default',
      },
    };
    return render(
      <BrowserRouter>
        <ScrollToTop {...props}>
          {children}
        </ScrollToTop>
      </BrowserRouter>,
    );
  };
  describe('when rendering', () => {
    it('renders correctly', () => {
      expect(setupTest).not.toThrow();
    });

    it('renders its children correctly', () => {
      const children = <p>Other Children</p>;
      setupTest(children);

      expect(() => screen.getByText('Other Children')).not.toThrow();
    });

    it('does not call window.scrollTo', () => {
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
          key: 'default',
        },
      };
      rerender(
        <BrowserRouter>
          <ScrollToTop {...props}><p>Another Children</p></ScrollToTop>
        </BrowserRouter>,
      );

      expect(mockScrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
