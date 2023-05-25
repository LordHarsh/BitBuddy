import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center z-50">
      <div className="absolute top-[30%] animate-spin">
        <img src="/icon.png" width={300} alt="" />
      </div>
    </div>
  );
};

export default Loader;
