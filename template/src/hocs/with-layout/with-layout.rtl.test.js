import React from 'react';
import { render, screen } from '@testing-library/react';

import { withLayout } from './with-layout';
import { LAYOUT_TYPES } from './layout';

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

        expect(() => render(<WrappedComponent />)).not.toThrow();
      });
    });

    it('should render the children component for all layout types', () => {
      const Component = () => <div>Content</div>;

      Object.values(LAYOUT_TYPES).forEach((layoutType) => {
        const WrappedComponent = withLayout(layoutType, Component);
        render(<WrappedComponent />);

        expect(screen.getByText('Content')).toHaveTextContent('Content');
      });
    });
  });
});
