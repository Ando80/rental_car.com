import PropTypes from "prop-types";
import React from "react";

const PagePadded = ({ children, name, customClass, isSection }) => {
  return (
    <div
      className={`${name} 
      PAGE_PADDED padded container relative h-full w-full px-2 lg:px-10 
      ${
        isSection
          ? "section-spacer flex flex-col items-center gap-4 xl:gap-10"
          : ""
      } 
      ${customClass}`}
    >
      {children}
    </div>
  );
};

export default PagePadded;

PagePadded.defaultProps = {
  name: "",
  customClass: "",
  isSection: false,
};

PagePadded.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  customClass: PropTypes.string,
  isSection: PropTypes.bool,
};
