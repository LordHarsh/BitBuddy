import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Loader from "./Loader";

const SERVER_ENDPOINT =
  process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:8000";

const UrlAnalytics: FunctionComponent = () => {
  const [URL, setURL] = useState<any>();

  const [clicks, setClicks] = useState(0);
  const [shortURL, setShortURL] = useState("");
  const [originalURL, setOriginalURL] = useState("");

  const [error, setError] = useState();
  const {
    params: { shortId },
  } = useRouteMatch<{
    shortId: string;
  }>();

  useEffect(() => {
    async function getData() {
      return axios
        .get(`${SERVER_ENDPOINT}/api/analytics/${shortId}`)
        .then((res) => {
          setURL(res.data);
          setClicks(res.data.clicks);
          setShortURL(res.data.shortId);
          setOriginalURL(res.data.destination);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
    getData();
  }, [shortId]);
  if (!URL && !error) {
    return <Loader />;
  }
  if (URL) {
    return (
      <div className="flex justify-center flex-col items-center">
        <div className="absolute top-[20%] lg:top-[25%] w-9/12">
          <div className="flex text-white justify-between  lg:flex-row flex-col lg:space-x-14">
            <div className="text-center bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg px-10 py-6  rounded-lg">
              <div className="text-xl font-semibold">Clicks</div>
              <div className="text-lg">{clicks}</div>
            </div>
            <div className="px-10 py-6 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg text-center lg:w-full  rounded-lg mt-8 lg:mt-0">
              <div className="text-xl font-semibold">ShortURL</div>
              <div>{shortURL}</div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-32 justify-center px-4 md:px-10 py-6 flex flex-col text-center w-full text-white bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-lg lg:mt-14 mt-8">
              <div className="text-xl font-semibold">Original URL</div>
              <div className="overflow-y-auto">{originalURL}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <p className="absolute text-white md:text-6xl text-4xl font-semibold top-[10%] left-[5%]">
      Error 404! URL not found! 😔
    </p>
  );
};

export default UrlAnalytics;
