import { LayoutType, withLayout } from "hocs/with-layout";
import { About } from "./about";

const WrappedAbout = withLayout(LayoutType.NavAndFooter, About);

export { WrappedAbout as About };
