import { Login } from "pages/login/login";
import { Home } from "pages/home";
import { About } from "pages/about";
import { NotFound } from "pages/not-found";
import { SignUp } from "pages/sign-up/sign-up";
import { RouteName } from "./routes";
import { ResetPassword } from "pages/reset-password";
import { ForgotPassword } from "pages/forgot-password";

// NOTE: this object is needed to avoid circular dependencies.
// Without it, importing the AppLink component in a page will create
// a dependency loop.
const RouteComponent = {
  [RouteName.Home]: Home,
  [RouteName.About]: About,
  [RouteName.Login]: Login,
  [RouteName.NotFound]: NotFound,
  [RouteName.SignUp]: SignUp,
  [RouteName.ResetPassword]: ResetPassword,
  [RouteName.ForgotPassword]: ForgotPassword,
};

export { RouteComponent };
