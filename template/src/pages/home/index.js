import { withLayout, LAYOUT_TYPES } from 'hocs/with-layout';
import { Home } from './home';

const WrappedHome = withLayout(LAYOUT_TYPES.HOME, Home);

export { WrappedHome as Home };
