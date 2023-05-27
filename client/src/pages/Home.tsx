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
        className="bg-[#29b6f6] text-white font-bold top-0 rounded-md px-2 md:px-3 text-xl py-1 absolute mt-11 mx-8"
        onClick={() => setCustomize(!customize)}
      >
        {customize ? "RANDOMIZE" : "CUSTOMIZE"}
      </button>
      {customize ? <URLCustomForm /> : <URLShortenerForm />}
    </>
  );
};

export default Home;
