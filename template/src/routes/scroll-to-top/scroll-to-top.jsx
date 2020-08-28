import React from 'react';
import PropTypes from 'prop-types';

const IPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};

/*
  This component is useful to trigger a scroll to the top of
  the page each time the router triggers a route change.
*/
class ScrollToTop extends React.Component {
  static urlFromLocation(location) {
    return `${location.pathname}${location.search}${location.hash}`;
  }

  componentDidUpdate(prevProps) {
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

ScrollToTop.propTypes = IPropTypes;

export { ScrollToTop };
