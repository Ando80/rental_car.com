import PropTypes from "prop-types";
import React from "react";

const FullPage = ({ children, name = "" }) => {
  return <div className={`full-page ${name} relative w-full `}>{children}</div>;
};

export default FullPage;

FullPage.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};
