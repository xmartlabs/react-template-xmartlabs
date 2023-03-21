import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { Layout, LayoutType } from './layout';

describe('Layout', () => {
  describe('with a correct layout type', () => {
    it('should render correctly', () => {
      const renderMethod = () => render(
        <Layout
          layoutType={LayoutType.Default}
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
