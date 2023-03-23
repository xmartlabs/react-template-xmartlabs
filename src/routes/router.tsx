import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './scroll-to-top';
import type { Route as RouteType } from './routes';
import { RouteComponent } from './route-component';

type RouterProps = {
  routes: RouteType[],
};

const renderRoutes = (routeData: RouteType[]) => (
  routeData.map((data) => (
    <Route
      key={data.path}
      path={data.path}
      element={RouteComponent[data.name]}
    />
  ))
);

const Router = (props: RouterProps) => (
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        {renderRoutes(props.routes)}
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);

export { Router };
