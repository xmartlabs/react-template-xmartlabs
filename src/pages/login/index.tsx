import { LayoutType, withLayout } from "hocs/with-layout";
import { Login } from "./login";

const WrappedLogin = withLayout(LayoutType.NavAndFooter, Login);

export { WrappedLogin as Login };
