import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
interface CardsProps {
  longlink: string;
  shortURL: string;
}

const Linkcards: FunctionComponent<CardsProps> = ({ longlink, shortURL }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CLIENT_ENDPOINT}` + shortURL
    );
    toast.success("Copied! to Clipboard!✅", {
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    });
  };
  return (
    <>
      <ToastContainer />
      <div className=" w-screen  py-3 px-3 rounded-md mt-2 bg-white bg-opacity-10 hover:bg-opacity-20 lg:backdrop-blur-lg drop-shadow-lg text-white">
        <div className="flex justify-between items-center">
          <div>
            <div>Original Link: {longlink.substring(0, 20)}...</div>
            <a href={`${process.env.REACT_APP_CLIENT_ENDPOINT}${shortURL}`}>
              <div className="font-semibold">Shorten Link: {shortURL}</div>
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
