import React from 'react';
import { shallow } from 'enzyme';

import { ScrollToTop } from './scroll-to-top';

describe('ScrollToTop', () => {
  describe('when rendering', () => {
    it('renders correctly', () => {
      const subject = shallow(<ScrollToTop />);

      expect(subject.exists()).toBe(true);
    });
  });
});
