import React, { FunctionComponent } from "react";

const Loader: FunctionComponent = () => {
  return (
    <div className="flex justify-center items-center z-50">
      <div className="absolute top-[30%] animate-spin">
        <img src="/icon.png" width={300} alt="" />
      </div>
    </div>
  );
};

export default Loader;
