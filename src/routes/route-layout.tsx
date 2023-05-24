import { Outlet } from 'react-router-dom';
import { ScrollToTop } from './scroll-to-top';

export const RouteLayout = () => (
  <ScrollToTop>
    <Outlet />
  </ScrollToTop>
);
