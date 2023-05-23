import axios from "axios";
import { FunctionComponent, useState } from "react";
import { SERVER_ENDPOINTS } from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const URLShortenerForm: FunctionComponent = () => {
  const [destination, setDestination] = useState("");
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://bit-buddy.vercel.app/` + shortUrl?.shortId
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
        })
        .then((resp) => resp.data);
      toast.success("Link has been Shortened!✅", {
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      setShortUrl(result);
    } catch (error) {
      toast.error("Please enter a valid URL!", {
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="h-screen flex justify-center">
        <div className=" rounded-md lg:w-7/12 w-10/12 top-[25%] absolute">
          <Header />
          <form
            className="flex justify-center flex-row items-center"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full text-xl text-black outline-none rounded-l-md bg-white py-3 px-4 font-semibold"
              onChange={(e: any) => setDestination(e.target.value)}
              placeholder="Paste your link here..."
            />
            <button
              disabled={!destination}
              type="submit"
              className="bg-pink-400 text-black font-semibold rounded-r-md px-2 md:px-10 text-xl py-3"
            >
              BitBuddy!
            </button>
          </form>
          <div className="flex justify-center pt-10">
            {shortUrl ? (
              <div className="flex justify-between text-black md:text-2xl font-bold md:space-x-20 space-x-4 bg-pink-300 md:px-10 px-4 py-2 rounded-md">
                <a href={`https://bit-buddy.vercel.app/${shortUrl?.shortId}`}>
                  <div>BitBuddy/{shortUrl?.shortId}</div>
                </a>
                <div onClick={handleCopy} className="cursor-pointer">
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

export default URLShortenerForm;
