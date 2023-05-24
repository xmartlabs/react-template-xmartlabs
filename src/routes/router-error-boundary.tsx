import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { logger } from 'helpers/logger';
import { UnexpectedError } from 'pages/unexpected-error';

export const RouterErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    logger.error(error as Error);
  }, [error]);

  return <UnexpectedError />;
};
