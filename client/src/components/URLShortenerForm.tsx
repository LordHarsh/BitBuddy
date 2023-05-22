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
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e: any) => setDestination(e.target.value)}
          placeholder="https://example.com"
        />
        <button type="submit">CREATE</button>
      </form>
      {shortUrl && (
        <a href={`/${shortUrl?.shortId}`}>
          {window.location.origin}/{shortUrl?.shortId}
        </a>
      )}
    </div>
  );
}

export default URLShortenerForm;
