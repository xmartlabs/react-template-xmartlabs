import { withLayout, LayoutType } from 'hocs/with-layout';
import { Home } from './home';

const WrappedHome = withLayout(LayoutType.NavAndFooter, Home);

export { WrappedHome as Home };
