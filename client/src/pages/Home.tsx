import { useState } from "react";
import Navbar from "../components/Navbar";
import URLCustomForm from "../components/URLCustomForm";
import URLShortenerForm from "../components/URLShortenerForm";

const Home = () => {
  const [customize, setCustomize] = useState(false);
  return (
    <>
      <Navbar />
      <button
        className="bg-white bg-opacity-5 hover:bg-opacity-10 backdrop-blur-lg drop-shadow-lg text-white font-bold top-0 rounded-md px-2 md:px-3 text-xl py-1 absolute mt-11 mx-8"
        onClick={() => setCustomize(!customize)}
      >
        {customize ? "🥴" : "🤩"}
      </button>
      {customize ? <URLCustomForm /> : <URLShortenerForm />}
    </>
  );
};

export default Home;
