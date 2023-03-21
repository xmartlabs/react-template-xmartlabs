import { describe, expect, it } from 'vitest';
import { classnames } from './utils';

describe('classnames', () => {
  describe('when input is a group of strings', () => {
    it('returns the strings joined by spaces', () => {
      expect(classnames('class1', 'class2', 'class3')).toEqual('class1 class2 class3');
    });
  });
  describe('when input is an object with boolean values', () => {
    it('returns the keys that have truthy values joined by spaces', () => {
      expect(classnames({ class1: false, class2: true, class3: 1 })).toEqual('class2 class3');
    });
  });
  describe('when input is a mix of previous cases', () => {
    it('returns the correct strings depending on the case', () => {
      expect(classnames({ class1: false, class2: true }, 'class3', { class4: true })).toEqual('class2 class3 class4');
    });
  });
});
