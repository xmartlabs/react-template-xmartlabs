import React from 'react';
import PropTypes from 'prop-types';

const IPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired,
};

/*
  This component is useful to trigger a scroll to the top of
  the page each time the router triggers a route change.
*/
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.href !== prevProps.location.href) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = IPropTypes;

export { ScrollToTop };
