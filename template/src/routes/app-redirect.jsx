import React from 'react';
import PropTypes from 'prop-types';

import { goToPage } from './route-helpers';

/*
  This component is a wrapper for redirecting across and inside apps.

  AppRedirect is simple a component wrapper for goToPage() behaviour. It simply
  renders nothing and calls that function on componentDidMount().

  NOTE: this component is only useful for routing inside the apps
  defined in this project. To link outside, use <a></a> tags as usual.
*/

const IPropTypes = {
  pathParams: PropTypes.object,
  queryParams: PropTypes.object,
  routeName: PropTypes.string.isRequired,
};

const defaultProps = {
  pathParams: {},
  queryParams: {},
};

class AppRedirect extends React.Component {
  componentDidMount() {
    goToPage(this.props.routeName, this.props.pathParams, this.props.queryParams);
  }

  render() {
    return null;
  }
}

AppRedirect.propTypes = IPropTypes;
AppRedirect.defaultProps = defaultProps;

export { AppRedirect };
