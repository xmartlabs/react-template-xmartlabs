import { Outlet } from "react-router";
import { ScrollToTop } from "./scroll-to-top";

export const RouteLayout = () => (
  <ScrollToTop>
    <Outlet />
  </ScrollToTop>
);
