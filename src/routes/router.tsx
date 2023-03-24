import React from 'react';
import {
  BrowserRouter, Routes, Route, useLocation,
} from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { ScrollToTop } from './scroll-to-top';
import type { Route as RouteType } from './routes';
import { RouteComponent } from './route-component';

type RouterProps = {
  routes: RouteType[],
};

const renderRoutes = (routeData: RouteType[]) => (
  routeData.map((data) => {
    const routeComponent: React.ReactNode = React.createElement(RouteComponent[data.name]);
    return (
      <Route
        key={data.path}
        path={data.path}
        element={routeComponent}
      />
    );
  })
);

const Router = (props: RouterProps) => {
  const location: Location = useLocation();
  return (
    <BrowserRouter>
      <ScrollToTop location={location}>
        <Routes>
          {renderRoutes(props.routes)}
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export { Router };
