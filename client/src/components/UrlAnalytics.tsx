import { FunctionComponent, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Loader from "./Loader";
import Qrcode from "./Qrcode";
import { getAnalytics } from "../utils/rest";
import { analyticsoptions, hostedlink, urltext } from "../utils/constants";

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
    const getData = async () => {
      try {
        const res = await getAnalytics(shortId);
        const data = await res;
        setURL(data);
        setClicks(data.clicks);
        setShortURL(data.shortId);
        setOriginalURL(data.destination);
      } catch (error: Error | any) {
        setError(error.message);
      }
    };
    getData();
  }, [shortId]);

  if (!URL && !error) {
    return <Loader />;
  }
  if (URL) {
    return (
      <div className="flex justify-center flex-col items-center">
        <div className="absolute top-[15%] lg:top-[25%] w-9/12">
          <div className="flex text-white justify-between  lg:flex-row flex-col lg:space-x-14">
            <div className="text-center bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg px-10 py-6  rounded-lg">
              <div className="text-xl font-semibold">
                {analyticsoptions.clicks}
              </div>
              <div className="text-lg">{clicks}</div>
            </div>
            <div className="text-center p-2 mt-6  lg:mt-0 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-lg">
              <div className="">
                <Qrcode value={`${hostedlink}${shortURL}`} />
              </div>
            </div>
            <div className="px-10 py-6 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg text-center lg:w-full  rounded-lg mt-8 lg:mt-0">
              <div className="text-xl font-semibold">
                {analyticsoptions.short}
              </div>
              <div>{shortURL}</div>
            </div>
          </div>
          <div className="flex justify-center mb-24 lg:mb-0">
            <div className="h-32 justify-center px-4 md:px-10 py-6 flex flex-col text-center w-full text-white bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-lg lg:mt-14 mt-8">
              <div className="text-xl font-semibold">
                {analyticsoptions.long}
              </div>
              <div className="overflow-y-auto">{originalURL}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <p className="absolute text-white md:text-6xl text-4xl font-semibold top-[10%] left-[5%]">
      {urltext.fail}
    </p>
  );
};

export default UrlAnalytics;
