import React from 'react';
import { render } from '@testing-library/react';

import { Layout, LAYOUT_TYPES } from './layout';

describe('LAYOUT_TYPES', () => {
  it('should have at least one value', () => {
    expect(Object.keys(LAYOUT_TYPES).length).toBeGreaterThan(0);
  });

  it('shouldn\'t have duplicated values', () => {
    const uniqueList = [];
    Object.values(LAYOUT_TYPES).forEach((value) => {
      if (!uniqueList.includes(value)) {
        uniqueList.push(value);
      }
    });

    expect(uniqueList).toHaveLength(Object.values(LAYOUT_TYPES).length);
  });
});

describe('Layout', () => {
  describe('with a correct layout type', () => {
    it('should render correctly', () => {
      const renderMethod = () => render(
        <Layout
          layoutType={Object.values(LAYOUT_TYPES)[0]}
        >
          <div>
            Content
          </div>
        </Layout>,
      );

      expect(renderMethod).not.toThrow();
    });
  });

  describe('with no layout type', () => {
    it('should throw an error', () => {
      expect(() => {
        render(
          <Layout>
            <div>
              Content
            </div>
          </Layout>,
        );
      }).toThrow();
    });
  });

  describe('with an invalid layout type', () => {
    it('should throw an error', () => {
      expect(() => {
        render(
          <Layout layoutType="invalidLayout">
            <div>
              Content
            </div>
          </Layout>,
        );
      }).toThrow();
    });
  });
});
