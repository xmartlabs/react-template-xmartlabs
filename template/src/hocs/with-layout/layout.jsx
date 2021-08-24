import React from 'react';
import PropTypes from 'prop-types';

const LAYOUT_TYPES = {
  HOME: 'home',
};

const IPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  layoutType: PropTypes.oneOf(Object.values(LAYOUT_TYPES)).isRequired,
};

const Layout = ({ layoutType, children }) => {
  if (layoutType === LAYOUT_TYPES.HOME) {
    return (
      <>
        {children}
      </>
    );
  }
  return null;
};

Layout.propTypes = IPropTypes;

export { Layout, LAYOUT_TYPES };
