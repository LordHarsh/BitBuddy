import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { success } from "../../utils/toast";
import { cardsprops } from "../../utils/schema";
import { hostedlink, link } from "../../utils/constants";

const Linkcards: FunctionComponent<cardsprops> = ({ longlink, shortURL }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CLIENT_ENDPOINT}` + shortURL
    );
    success("Copied to Clipboard!✅");
  };
  return (
    <>
      <ToastContainer />
      <div className="w-screen  py-3 px-3 rounded-md mt-2 bg-white bg-opacity-10 hover:bg-opacity-20 lg:backdrop-blur-lg drop-shadow-lg text-white">
        <div className="flex justify-between items-center">
          <div className="hidden lg:block">
            <div>
              {link.long}
              {longlink.substring(0, 100)}...
            </div>
            <a href={`${hostedlink}${shortURL}`}>
              <div>
                {link.short}
                {shortURL}
              </div>
            </a>
          </div>
          <div className="hidden md:block lg:hidden">
            <div>
              {link.long}
              {longlink.substring(0, 100)}...
            </div>
            <a href={`${hostedlink}${shortURL}`}>
              <div>
                {link.short}
                {shortURL}
              </div>
            </a>
          </div>
          <div className="md:hidden block">
            <div>{longlink.substring(0, 25)}...</div>
            <a href={`${hostedlink}${shortURL}`}>
              <div>{shortURL}</div>
            </a>
          </div>
          <div className="flex space-x-2">
            <Link to={`/url/analytics/${shortURL}`}>
              <div className="cursor-pointer text-2xl hover:scale-110">⚙️</div>
            </Link>
            <div
              onClick={handleCopy}
              className="cursor-pointer text-2xl hover:scale-110"
            >
              📝
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Linkcards;
