import PropTypes from 'prop-types';
import React from 'react';

const ButtonPrimary = ({ children, type, onClick, customClass }) => {
  return (
    <div
      onClick={onClick}
      className={`null-button button-primary ${type} ${customClass}`}
    >
      {children}
    </div>
  );
};

export default ButtonPrimary;

ButtonPrimary.defaultProps = {
  children: '',
  type: 'gradient',
  onClick: () => {},
  customClass: '',
};

ButtonPrimary.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  customClass: PropTypes.string,
};
