import axios from "axios";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const SERVER_ENDPOINT =
  process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:8000";

function HandleRedirectContainer() {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState();

  const {
    params: { shortId },
  } = useRouteMatch<{
    shortId: string;
  }>();

  useEffect(() => {
    async function getData() {
      return axios
        .get(`${SERVER_ENDPOINT}/api/url/${shortId}`)
        .then((res) => setDestination(res.data.destination))
        .catch((error) => {
          setError(error.message);
        });
    }
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
        URL found! Redirecting... 🚀
      </p>
    );
  }

  return (
    <div>
      <Navbar />
      <p className="absolute text-white md:text-6xl text-4xl font-semibold top-[12%] left-[5%]">
        Error 404! URL not found! 😔
      </p>
    </div>
  );
}

export default HandleRedirectContainer;
