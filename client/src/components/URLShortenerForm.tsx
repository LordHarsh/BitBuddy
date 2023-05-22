import axios from "axios";
import { useState } from "react";
import { SERVER_ENDPOINTS } from "../config";

function URLShortenerForm() {
  const [destination, setDestination] = useState();
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    const result = await axios
      .post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
      })
      .then((resp) => resp.data);

    setShortUrl(result);
  }

  return (
    <div>
      <div className="pt-44">
        <form
          className="flex justify-center items-center px-10 "
          onSubmit={handleSubmit}
        >
          <input
            className="border-b-2 w-96 p-2 text-black "
            onChange={(e: any) => setDestination(e.target.value)}
            placeholder="https://example.com"
          />
          <button type="submit" className="border-2 p-2 font-bold bg-blue-400">
            Shorten
          </button>
        </form>
        <div className="flex justify-center pt-4">
          {shortUrl && (
            <a href={`/${shortUrl?.shortId}`}>
              Shorten-URL: {window.location.origin}/{shortUrl?.shortId}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default URLShortenerForm;
