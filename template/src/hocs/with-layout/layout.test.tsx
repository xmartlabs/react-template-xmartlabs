import React from 'react';
import { render } from '@testing-library/react';

import { Layout, LayoutType } from './layout';

describe('Layout', () => {
  describe('with a correct layout type', () => {
    it('should render correctly', () => {
      const renderMethod = () => render(
        <Layout
          layoutType={LayoutType.Home}
        >
          <div>
            Content
          </div>
        </Layout>,
      );

      expect(renderMethod).not.toThrow();
    });
  });
});
