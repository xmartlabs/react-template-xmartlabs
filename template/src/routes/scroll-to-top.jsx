import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const IPropTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired,
};

/*
  This component is useful to trigger a scroll to the top of
  the page each time the router triggers a route change.
*/
class UnwrappedScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

UnwrappedScrollToTop.propTypes = IPropTypes;

const ScrollToTop = withRouter(UnwrappedScrollToTop);

export { ScrollToTop };
