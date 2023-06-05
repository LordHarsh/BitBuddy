import React, { FunctionComponent } from "react";
import { headings } from "../../utils/constants";

const Header: FunctionComponent = () => {
  return (
    <div className="flex justify-center pt-10 ">
      <div className="text-white md:text-4xl text-2xl absolute font-semibold">
        {headings.history}
      </div>
    </div>
  );
};

export default Header;
