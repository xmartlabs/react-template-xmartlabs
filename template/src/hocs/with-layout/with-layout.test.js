import React from 'react';
import { shallow } from 'enzyme';

import { withLayout } from './with-layout';
import { LAYOUT_TYPES, Layout } from './layout';

describe('withLayout', () => {
  describe('when used correctly', () => {
    it('should return a function', () => {
      const Component = () => <div>Content</div>;
      const WrappedComponent = withLayout(Object.values(LAYOUT_TYPES)[0], Component);

      expect(typeof WrappedComponent).toBe('function');
    });

    it('should return a renderable component for all layout types', () => {
      const Component = () => <div>Content</div>;

      Object.values(LAYOUT_TYPES).forEach((layoutType) => {
        const WrappedComponent = withLayout(layoutType, Component);
        const subject = shallow(<WrappedComponent />);

        expect(subject.exists()).toBe(true);
      });
    });

    it('should render the Layout component for all layout types', () => {
      const Component = () => <div>Content</div>;

      Object.values(LAYOUT_TYPES).forEach((layoutType) => {
        const WrappedComponent = withLayout(layoutType, Component);
        const subject = shallow(<WrappedComponent />);

        expect(subject.find(Layout)).toHaveLength(1);
      });
    });

    it('should render the children component for all layout types', () => {
      const Component = () => <div>Content</div>;

      Object.values(LAYOUT_TYPES).forEach((layoutType) => {
        const WrappedComponent = withLayout(layoutType, Component);
        const subject = shallow(<WrappedComponent />);

        expect(subject.find(Component)).toHaveLength(1);
      });
    });
  });
});
