import { classnames } from './utils';

describe('classnames', () => {
  it('concat class', () => {
    expect(classnames('class1', 'class2', 'class3')).toEqual('class1 class2 class3');
  });

  it('use bool value', () => {
    expect(classnames({ 'class1': false, 'class2': true })).toEqual('class2');
  });

  it('multiple class', () => {
    expect(classnames({ 'class1': false, 'class2': true }, 'class3', { 'class4': true })).toEqual('class2 class3 class4');
  });
});
