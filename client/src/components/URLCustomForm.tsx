import axios from "axios";
import { FunctionComponent, useState } from "react";
import { SERVER_ENDPOINTS } from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const URLCustomForm: FunctionComponent = () => {
  const [destination, setDestination] = useState("");
  const [custom, setCustom] = useState("");
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CLIENT_ENDPOINT}` + shortUrl?.shortId
    );
    toast.success("Copied! to Clipboard!✅", {
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    try {
      const result = await axios
        .post(`${SERVER_ENDPOINTS}/api/url`, {
          destination,
          shortId: custom,
        })
        .then((resp) => resp.data);
      toast.success("Link has been Shortened!✅", {
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      setShortUrl(result);
    } catch (error: Error | any) {
      if (error.response.status === 409) {
        toast.error("Custom URL already exists!", {
          position: "top-right",
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      } else {
        toast.error("Please enter a valid URL!", {
          position: "top-right",
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      }
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="h-screen flex justify-center">
        <div className=" rounded-md lg:w-7/12 w-10/12 top-[25%] absolute">
          <Header />
          <form
            className="lg:flex-row flex flex-col space-y-1 lg:space-y-0 justify-center flex-rowtems-center"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full text-xl text-[#01002d] lg:mr-1 outline-none rounded-md bg-white py-3 px-4 font-semibold"
              onChange={(e: any) => setDestination(e.target.value)}
              placeholder="Paste your link here..."
            />
            <input
              className="w-full text-xl text-[#01002d] outline-none  rounded-md lg:rounded-r-none lg:rounded-l-md bg-white py-3 px-4 font-semibold"
              onChange={(e: any) => setCustom(e.target.value)}
              placeholder="Enter your custom URL here..."
            />
            <button
              disabled={!(destination && custom)}
              type="submit"
              className="bg-[#29b6f6] text-white font-bold rounded-md lg:rounded-l-none lg:rounded-r-md  px-2 md:px-10 text-xl py-3"
            >
              BitBuddy!
            </button>
          </form>
          <div className="flex justify-center pt-10">
            {shortUrl ? (
              <div className="flex justify-between text-white md:text-2xl font-bold md:space-x-20 space-x-4 bg-[#29b6f6] md:px-10 px-4 py-2 rounded-md">
                <a
                  href={`${process.env.REACT_APP_CLIENT_ENDPOINT}${shortUrl?.shortId}`}
                >
                  <div>BitBuddy/{shortUrl?.shortId}</div>
                </a>
                <div
                  onClick={handleCopy}
                  className="cursor-pointer hover:scale-125"
                >
                  📝
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLCustomForm;
