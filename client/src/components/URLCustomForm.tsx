import { FunctionComponent, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { customURL } from "../utils/rest";
import { failure, success } from "../utils/toast";

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
    success("Copied to Clipboard!✅");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    try {
      const result = await customURL({ destination, shortId: custom });
      const data = await result;
      setShortUrl(data);
      success("Link has been Shortened!✅");
    } catch (error: Error | any) {
      if (error.response.status === 409) {
        failure("Custom URL already exists!");
      } else {
        failure("Please enter a valid URL!");
      }
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center">
        <div className="rounded-md lg:w-8/12 w-10/12 top-[20%] absolute">
          <Header />
          <form
            className="lg:flex-row flex flex-col space-y-1 lg:space-y-0 justify-center flex-rowtems-center"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full text-xl text-white text-center lg:text-left lg:mr-1 outline-none placeholder:text-white rounded-md bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg py-3 px-4 font-semibold"
              onChange={(e: any) => setDestination(e.target.value)}
              placeholder="Paste your link here"
            />
            <input
              className="w-full text-xl text-white text-center lg:text-left placeholder:text-white outline-none  rounded-md lg:rounded-r-none lg:rounded-l-md bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg py-3 px-4 font-semibold"
              onChange={(e: any) => setCustom(e.target.value)}
              placeholder="Enter your custom URL here"
            />
            <button
              disabled={!(destination && custom)}
              type="submit"
              className="bg-[#23227d] text-white font-bold rounded-md lg:rounded-l-none lg:rounded-r-md  px-2 md:px-10 text-xl py-3"
            >
              BitBuddy!
            </button>
          </form>
          <div className="flex justify-center pt-4">
            {shortUrl ? (
              <div className=" w-full text-white md:text-2xl font-bold md:space-x-20 space-x-4 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg md:px-10 px-4 py-2 rounded-md">
                <div className="flex justify-between">
                  <a href={`https://www.bitbuddy.tech/${shortUrl?.shortId}`}>
                    <div>bitbuddy.tech/{shortUrl?.shortId}</div>
                  </a>
                  <div className="flex space-x-2">
                    <Link to={`/url/analytics/${shortUrl?.shortId}`}>
                      <div className="cursor-pointer hover:scale-125">⚙️</div>
                    </Link>
                    <p
                      onClick={handleCopy}
                      className="cursor-pointer hover:scale-125"
                    >
                      📝
                    </p>
                  </div>
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
