export const mockScrollTo = jest.fn();

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: mockScrollTo,
});
