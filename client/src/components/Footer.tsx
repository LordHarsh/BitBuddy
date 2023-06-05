import React, { FunctionComponent } from "react";
import { footertext } from "../utils/constants";

const Footer: FunctionComponent = () => {
  return (
    <div className="flex justify-center z-50">
      <div className="text-white fixed w-screen text-center py-8 bg-white bg-opacity-0 hover:bg-opacity-5 backdrop-blur-lg drop-shadow-lg bottom-0 font-semibold text-cool text-md">
        {footertext}
      </div>
    </div>
  );
};

export default Footer;
