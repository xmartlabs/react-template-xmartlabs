import React from "react";

import { logger } from "helpers/logger";
import { UnexpectedError } from "pages/unexpected-error";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/*
  NOTE: remember that error boundaries do not catch
  all kinds of errors: https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
*/
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidMount() {
    // Catch unhandled Promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      // Unhandled rejections do not necessarily indicate a crash
      // of the whole application, so there's no immediate need
      // to show a fallback UI.
      logger.warn(`Unhandled Promise rejection: ${String(event.reason)}`);
      const error = new Error(String(event.reason));
      logger.error(error.message);
    });
  }

  componentDidCatch(error: Error) {
    logger.warn(error.message);
  }

  render() {
    if (this.state.hasError) {
      return <UnexpectedError />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
