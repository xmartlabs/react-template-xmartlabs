import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RouterProvider } from "react-router-dom";
import { AppLink } from "common/app-link";
import { RouteName, createRouter, routes } from "../../routes/index";

export default {
  title: "AppLink",
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
  className,
  targetBlank,
  children,
  route,
}) => (
  <AppLink route={route} className={className} targetBlank={targetBlank}>
    {children}
  </AppLink>
);

Default.argTypes = {
  route: {
    routeName: {
      control: {
        type: "select",
        options: RouteName,
      },
    },
  },
};
Default.args = {
  children: "My Link To Home",
  route: {
    routeName: RouteName.Home,
    pathParams: {},
    queryParams: {},
  },
  className: "",
  targetBlank: false,
};
