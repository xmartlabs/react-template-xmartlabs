import { AppLink } from "common/app-link";
import { RouteName } from "routes/routes";

// TODO: implement this page
const NotFound = () => (
  <div>
    This page does not exist!
    <AppLink routeName={RouteName.Home}>Go Home</AppLink>
  </div>
);

export { NotFound };
