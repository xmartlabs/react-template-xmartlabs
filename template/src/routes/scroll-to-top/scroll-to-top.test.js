import React from 'react';
import { shallow } from 'enzyme';

import { mockScrollTo } from 'tests/support/window-mock';
import { ScrollToTop } from './scroll-to-top';

describe('ScrollToTop', () => {
  const location = {
    pathname: '/path',
    hash: '#hash',
    search: '?param1=value1',
  };
  const setupTest = (children = 'Children') => shallow(
    <ScrollToTop location={location}>
      {children}
    </ScrollToTop>,
  );
  describe('when rendering', () => {
    it('renders correctly', () => {
      const subject = setupTest();

      expect(subject.exists()).toBe(true);
    });

    it('renders its children correctly', () => {
      const children = 'Other Children';
      const subject = setupTest(children);

      expect(subject.text()).toBe(children);
    });

    it('does not call window.scrollTo', () => {
      setupTest();

      expect(mockScrollTo).not.toHaveBeenCalled();
    });
  });

  describe('when updating', () => {
    it('calls window.scrollTo', () => {
      const subject = setupTest();

      subject.setProps({
        location: {
          pathname: '/another/path',
          hash: '#hash',
          search: '?param1=value1',
        },
      });

      expect(mockScrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
