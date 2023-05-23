import axios from "axios";
import { FunctionComponent, useState } from "react";
import { SERVER_ENDPOINTS } from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URLShortenerForm: FunctionComponent = () => {
  const [destination, setDestination] = useState("");
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    if (destination === "")
      return toast.error("Please enter a valid URL!", {
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
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
    setDestination("");
  }

  return (
    <div>
      <ToastContainer />
      <div className="pt-44 h-screen">
        <form
          className="flex justify-center space-x-10 items-center px-10 "
          onSubmit={handleSubmit}
        >
          <input
            className="border-b-2 w-8/12 p-2 text-black outline-none bg-transparent "
            onChange={(e: any) => setDestination(e.target.value)}
            placeholder="https://example.com"
          />
          <button
            type="submit"
            className="border-2 rounded-md p-2 font-bold bg-blue-400"
          >
            Shorten
          </button>
        </form>
        <div className="flex justify-center pt-4">
          {shortUrl && (
            <a
              href={`/${shortUrl?.shortId}`}
              className="w-fit border p-4 rounded-md  bg-opacity-0 hover:bg-opacity-10 backdrop-blur-lg drop-shadow-lg"
            >
              Shorten-URL:{" "}
              <span className=" text-red-900 font-bold">
                {window.location.origin}/{shortUrl?.shortId}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default URLShortenerForm;
