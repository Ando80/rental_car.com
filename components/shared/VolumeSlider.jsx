"use client";
import React, { useEffect, useState } from "react";

import { PropTypes } from "prop-types";

const VolumeSlider = ({ name = "Slider Name", value = 40 }) => {
  const [assignValue, setAssignValue] = useState(value);

  useEffect(() => {
    setAssignValue(value);
  }, [value]);

  return (
    <div className="volume-slider flex w-full flex-col text-left">
      <div className="text--paragraph my-4  font-semibold uppercase text-white">
        {name}
      </div>
    </div>
  );
};

export default VolumeSlider;

VolumeSlider.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
};
