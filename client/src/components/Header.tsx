import React, { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  return (
    <div>
      <h1 className="text-white text-center text-2xl md:text-6xl font-bold pt-10">
        <span className="text-[#29b6f6]">Shorten</span> Your Looong Links
      </h1>
      <div className="text-white text-center flex justify-center pt-10 pb-20">
        <div className="max-w-md font-semibold">
          BitBuddy is an efficient{" "}
          <span className="text-[#29b6f6]">easy-to-use URL shortening</span>{" "}
          service that streamlines your online experience.
        </div>
      </div>
    </div>
  );
};

export default Header;
