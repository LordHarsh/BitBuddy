import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { urltext } from "../utils/constants";
import { getURL } from "../utils/rest";

function HandleRedirectContainer() {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState();

  const {
    params: { shortId },
  } = useRouteMatch<{
    shortId: string;
  }>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getURL(shortId);
        const data = await res;
        setDestination(data.destination);
        console.log(res);
      } catch (error: Error | any) {
        setError(error.message);
      }
    };
    getData();
  }, [shortId]);

  useEffect(() => {
    if (destination) {
      window.location.replace(destination);
    }
  }, [destination]);

  if (!destination && !error) {
    return <Loader />;
  }

  if (destination) {
    return (
      <p className="absolute text-white md:text-6xl text-4xl font-semibold top-[10%] left-[5%]">
        {urltext.success}
      </p>
    );
  }

  return (
    <div>
      <Navbar />
      <p className="absolute text-white md:text-6xl text-4xl font-semibold top-[12%] left-[5%]">
        {urltext.fail}
      </p>
    </div>
  );
}

export default HandleRedirectContainer;
