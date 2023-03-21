import { LocationState, Location } from 'history';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type ScrollToTopProps = RouteComponentProps & {
  children: React.ReactNode,
};

/*
  This component is useful to trigger a scroll to the top of
  the page each time the router triggers a route change.
*/
class ScrollToTop extends React.Component<ScrollToTopProps> {
  static urlFromLocation(location: Location<LocationState>) {
    return `${location.pathname}${location.search}${location.hash}`;
  }

  componentDidUpdate(prevProps: ScrollToTopProps) {
    const currentUrl = ScrollToTop.urlFromLocation(this.props.location);
    const previousUrl = ScrollToTop.urlFromLocation(prevProps.location);
    if (currentUrl !== previousUrl) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export { ScrollToTop };
