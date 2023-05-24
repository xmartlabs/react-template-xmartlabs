import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RouterProvider } from 'react-router-dom';
import { AppLink } from 'common/app-link';
import {
  RouteName,
  createRouter,
  routes,
} from '../../routes/index';

export default {
  title: 'AppLink',
  component: AppLink,
  decorators: [
    (story) => {
      const routesMapped = routes.map((route) => ({
        ...route,
        Component: story,
      }));

      const router = createRouter(routesMapped);

      return (
        <div>
          <RouterProvider router={router} />
        </div>
      );
    },
  ],
} as ComponentMeta<typeof AppLink>;

export const Default: ComponentStory<typeof AppLink> = ({
  routeName, className, targetBlank, pathParams, queryParams, children,
}) => (
  <AppLink
    routeName={routeName}
    className={className}
    pathParams={pathParams}
    queryParams={queryParams}
    targetBlank={targetBlank}
  >
    {children}
  </AppLink>
);

Default.argTypes = {
  routeName: {
    control: {
      type: 'select',
      options: RouteName,
    },
  },
};
Default.args = {
  children: 'My Link To Home',
  routeName: RouteName.Home,
  className: '',
  targetBlank: false,
  pathParams: {},
  queryParams: {},
};
