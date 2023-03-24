import { render, screen } from '@testing-library/react';
import {
  describe, expect, it, afterEach, vi,
} from 'vitest';
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
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
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
      const children = <p>Other Children</p>;
      setupTest(children);

      expect(() => screen.getByText('Other Children')).not.toThrow();
    });

    it('does not call window.scrollTo', () => {
      const thing = setupTest();
      // console.log(thing.debug())

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
      rerender(<ScrollToTop {...props}><p>Children</p></ScrollToTop>);

      expect(mockScrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
