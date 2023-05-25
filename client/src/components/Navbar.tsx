import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const [path, setPath] = useState("");
  const router = window.location.pathname;
  // if (router === "/history") setPath("HOME");
  // else setPath("HISTORY");
  return (
    <div className="text-white flex justify-end items-center pt-10 px-10">
      <Link to={router === "/" ? "/history" : "/"}>
        <div className="text-2xl font-bold cursor-pointer">
          {router === "/" ? "HISTORY" : "HOME"}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
