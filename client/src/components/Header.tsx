import { FunctionComponent } from "react";
import { hometext } from "../utils/constants";

const Header: FunctionComponent = () => {
  return (
    <div>
      <h1 className="text-white text-center text-2xl md:text-6xl font-bold pt-10">
        <span className="text-[#29b6f6] text-cool">{hometext.headerblue}</span>{" "}
        {hometext.headerwhite}
      </h1>
      <div className="text-white text-center flex justify-center pt-10 pb-20">
        <div className="max-w-md font-semibold">
          {hometext.subheaderwhiteleft}{" "}
          <span className="text-[#23227d] font-bold text-cool">
            {hometext.subheaderblue}
          </span>{" "}
          {hometext.subheaderwhiteright}
        </div>
      </div>
    </div>
  );
};

export default Header;
