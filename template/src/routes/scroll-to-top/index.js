import { withRouter } from 'react-router-dom';

import { ScrollToTop } from './scroll-to-top';

const WrappedScrollToTop = withRouter(ScrollToTop);

export { WrappedScrollToTop as ScrollToTop };
