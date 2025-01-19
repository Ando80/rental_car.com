import PropTypes from "prop-types";
import React from "react";

const SectionHeadText = ({
  noTitle,
  noCaption,
  title,
  caption,
  isTight,
  description,
  isNarrow,
  customClass,
  displayWebsiteLink,
  website,
}) => {
  return (
    <div
      className={`section-head-text relative text-center ${
        isNarrow ? "w-[100%] xl:w-[55%]" : isTight ? "w-full xl:w-[35%]" : ""
      } ${customClass}`}
    >
      {!noTitle && (
        <h1 className="section-title text--title uppercase text-primary-light-pink">
          {displayWebsiteLink ? (
            <a href={website} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h1>
      )}
      {!noCaption && (
        <div className="section-caption text--section-caption !font-light uppercase text-secondary-pink">
          {caption}
        </div>
      )}
      {description && (
        <div
          className="section-description my-3 text-primary-pink md:my-5"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      )}
    </div>
  );
};
export default SectionHeadText;

SectionHeadText.defaultProps = {
  noTitle: false,
  noCaption: false,
  title: "",
  caption: "",
  isTight: false,
  description: "",
  isNarrow: false,
  customClass: "",
};

SectionHeadText.propTypes = {
  noTitle: PropTypes.bool,
  noCaption: PropTypes.bool,
  title: PropTypes.string,
  caption: PropTypes.string,
  isTight: PropTypes.bool,
  description: PropTypes.string,
  isNarrow: PropTypes.bool,
  customClass: PropTypes.string,
  displayWebsiteLink: PropTypes.bool,
  website: PropTypes.string,
};
