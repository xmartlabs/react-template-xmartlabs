import { withLayout, LayoutType } from 'hocs/with-layout';
import { About } from './about';

const WrappedAbout = withLayout(LayoutType.Default, About);

export { WrappedAbout as About };
