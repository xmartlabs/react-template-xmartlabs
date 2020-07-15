import React from 'react';
import { shallow } from 'enzyme';

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
      const subject = shallow(
        <Layout
          layoutType={Object.values(LAYOUT_TYPES)[0]}
        >
          <div>
            Content
          </div>
        </Layout>,
      );

      expect(subject.exists()).toBe(true);
    });
  });

  describe('with no layout type', () => {
    it('should throw an error', () => {
      expect(() => {
        shallow(
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
        shallow(
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
