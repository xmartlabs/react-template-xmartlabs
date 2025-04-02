import { useEffect } from "react";
import { useRouteError } from "react-router";
import { logger } from "helpers/logger";
import { UnexpectedError } from "pages/unexpected-error";

export const RouterErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    const message = error instanceof Error ? error.message : error;
    logger.warn(message as string);
  }, [error]);

  return <UnexpectedError />;
};
