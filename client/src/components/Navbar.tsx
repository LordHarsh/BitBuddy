import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-white flex justify-between items-center pt-10 px-10">
      <div className="">
        <div className=" items-center flex">
          <Link to="/" className="absolute cursor-pointer">
            <img className="" src="/icon.png" width={80} alt="" />
          </Link>
        </div>
      </div>
      <Link to="/history">
        <div className="text-2xl font-bold cursor-pointer">HISTORY</div>
      </Link>
    </div>
  );
};

export default Navbar;
