import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const Navbar: FunctionComponent = () => {
  const router = window.location.pathname;

  return (
    <div className="text-white flex justify-end items-center pt-16 px-10">
      <Link to={router === "/" ? "/url/history" : "/"} className="absolute">
        <div className="text-2xl font-bold cursor-pointer">
          {router === "/" ? "HISTORY" : "HOME"}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
