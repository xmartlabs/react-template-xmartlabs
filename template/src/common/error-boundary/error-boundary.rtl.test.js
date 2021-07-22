import React from 'react';
import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  describe('when rendered without errors', () => {
    const setupTest = (children) => {
      const listenerSpy = jest.spyOn(window, 'addEventListener')
        .mockImplementation(() => {});
      render(
        <ErrorBoundary>
          {children}
        </ErrorBoundary>,
      );

      return {
        listenerSpy,
      };
    };

    it('must render its children', () => {
      const children = 'This is a text';
      setupTest(children);

      expect(screen.getByText(children)).toHaveTextContent(children);
    });

    it('must setup an event listener for unhandled rejections', () => {
      const { listenerSpy } = setupTest('Children');

      // NOTE: we're testing that at least one handler has been set for unhandled rejections
      // since it appears that some other code is setting up other handlers as well
      // (probably testing library?)
      expect(listenerSpy.mock.calls.some((call) => call[0] === 'unhandledrejection')).toBe(true);
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
      render(
        <ErrorBoundary>
          <ProblematicComponent />
        </ErrorBoundary>,
      );
      // Restore the console after the error has been caught
      consoleSpy.mockRestore();
    };

    it('calls componentDidCatch only once', () => {
      const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
      setupTest();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('renders UnexpectedError', () => {
      setupTest();

      expect(screen.getByRole('heading')).toHaveTextContent('An unexpected error has occured.');
    });
  });
});
