import PropTypes from 'prop-types';
import React from 'react';

export const Divider = ({ customClass }) => {
  return (
    <hr className={`gradient-bg h-[2px] w-full opacity-30 ${customClass}`} />
  );
};

Divider.propTypes = {
  customClass: PropTypes.string,
};

Divider.defaultProps = {
  customClass: '',
};