import React from 'react';
import { shallow } from 'enzyme';
import { App } from 'app';

describe('App', () => {
  it('should render correctly', () => {
    const output = shallow(<App />);
    expect(output.exists()).toBe(true);
  });
});
