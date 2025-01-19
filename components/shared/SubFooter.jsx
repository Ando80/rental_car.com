import Link from "next/link";
import React from "react";
import style from "./style.module.scss";

const SubFooter = () => {
  return (
    <div
      className={`flex items-center justify-center bg-primary-pink text-center text-white py-4 ${style.footer}`}
    >
      <div className="md:text--body text-xs font-light">
        Copyright © ProTender –{" "}
        <span>
          {" "}
          <Link href="/"> Confidential </Link>
        </span>
        |
        <span>
          <Link href="/"> Privacy Policy</Link>
        </span>
      </div>
    </div>
  );
};

export default SubFooter;
