import React from 'react';
import { mount, shallow } from 'enzyme';

import { UnexpectedError } from 'pages/unexpected-error';
import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  describe('when rendered without errors', () => {
    const setupTest = (children) => {
      const listenerSpy = jest.spyOn(window, 'addEventListener')
        .mockImplementationOnce(() => {});
      const subject = shallow(
        <ErrorBoundary>
          {children}
        </ErrorBoundary>,
      );

      return {
        subject,
        listenerSpy,
      };
    };

    it('must render its children', () => {
      const children = 'This is a text';
      const { subject } = setupTest(children);

      expect(subject.text()).toEqual(children);
    });

    it('must setup an event listener once', () => {
      const { listenerSpy } = setupTest('Children');

      expect(listenerSpy).toHaveBeenCalledTimes(1);
    });

    it('must setup an event listener for unhandled rejections', () => {
      const { listenerSpy } = setupTest('Children');

      // We just need to check the first parameter here, that's why
      // `toHaveBeenCalledWith` is not used, since we don't have access
      // to the exact handler function passed.
      expect(listenerSpy.mock.calls[0][0]).toEqual('unhandledrejection');
    });

    it('must pass a handler to react to the event', () => {
      const { listenerSpy } = setupTest('Children');

      expect(listenerSpy.mock.calls[0][1]).toBeInstanceOf(Function);
    });
  });

  describe('when an error is thrown on a child', () => {
    const ProblematicComponent = () => {
      throw new Error('The component has crashed');
    };

    const setupTest = () => {
      // NOTE: The error boundary calls console.error with a very big stack
      // This makes reading test output hard even when all tests pass.
      // This mock silences the console just for this test.
      const consoleSpy = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      const subject = mount(
        <ErrorBoundary>
          <ProblematicComponent />
        </ErrorBoundary>,
      );
      // Restore the console after the error has been caught
      consoleSpy.mockRestore();

      return subject;
    };

    it('calls componentDidCatch only once', () => {
      const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
      setupTest();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('renders UnexpectedError', () => {
      const subject = setupTest();

      expect(subject.find(UnexpectedError).length).toEqual(1);
    });
  });
});
