import React, { FunctionComponent } from "react";
interface CardsProps {
  longlink: string;
  shortURL: string;
}
const Linkcards: FunctionComponent<CardsProps> = ({ longlink, shortURL }) => {
  return (
    <div className=" w-screen  lg:w-96 p-2 rounded-md mt-2 text-center bg-[#29b6f6] text-white">
      <div>Original Link: {longlink.substring(0, 25)}...</div>
      <a href={`${process.env.REACT_APP_CLIENT_ENDPOINT}${shortURL}`}>
        <div className="font-semibold">Shorten Link: {shortURL}</div>
      </a>
    </div>
  );
};

export default Linkcards;
