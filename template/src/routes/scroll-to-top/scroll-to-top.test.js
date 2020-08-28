import React from 'react';
import { shallow } from 'enzyme';

import { ScrollToTop } from './scroll-to-top';
import { mockScrollTo } from '../../tests/support/window-mock';

describe('ScrollToTop', () => {
  const location = { href: '/path' };
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
          href: '/another/path',
        },
      });

      expect(mockScrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
