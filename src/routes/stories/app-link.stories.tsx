import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AppLink, RouteName,
  Router, routes,
} from '../index';

export default {
  title: 'AppLink',
  component: AppLink,
  decorators: [
    (story) => {
      const routesMapped = routes.map((route) => ({
        ...route,
        component: story,
      }));

      return (
        <Router routes={routesMapped} />
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
