import { cleanup, screen } from '@testing-library/react';
import { renderWithRouter } from 'tests/helpers/render-with-router';
import { describe, expect, it } from 'vitest';
import { withLayout } from './with-layout';
import { LayoutType } from './layout';

describe('withLayout', () => {
  describe('when used correctly', () => {
    it('should return a function', () => {
      const Component = () => <div>Content</div>;
      const WrappedComponent = withLayout(LayoutType.Default, Component);

      expect(typeof WrappedComponent).toBe('function');
    });

    it('should return a renderable component for all layout types', () => {
      const Component = () => <div>Content</div>;

      Object.values(LayoutType).forEach((layoutType) => {
        const WrappedComponent = withLayout(layoutType, Component);

        expect(() => renderWithRouter(<WrappedComponent />)).not.toThrow();
      });
    });

    it('should render the children component for all layout types', () => {
      const Component = () => <div>Content</div>;

      Object.values(LayoutType).forEach((layoutType) => {
        const WrappedComponent = withLayout(layoutType, Component);
        renderWithRouter(<WrappedComponent />);

        expect(screen.getByText('Content')).toBeTruthy();
        // Cleans up the screen so the multiple renders are removed.
        cleanup();
      });
    });
  });
});
