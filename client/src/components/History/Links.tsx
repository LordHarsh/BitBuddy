import React, { useEffect, useState } from "react";
import Linkcards from "./Linkcards";
import { SERVER_ENDPOINTS } from "../../config";
import Loader from "../Loader";

const Links = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${SERVER_ENDPOINTS}/api/history`)
      .then((res) => res.json())
      .then((response) => setData(response));
  }, []);

  return (
    <div>
      {!data.length ? (
        <Loader />
      ) : (
        <div className="flex justify-center px-4 md:px-20 pt-10">
          <div className="bg-transparent z-50 rounded-md p-4 h-96 w-screen overflow-y-auto">
            <div className="flex justify-evenly flex-wrap">
              {data.map((element: any, id: number) => (
                <Linkcards
                  key={id}
                  longlink={element.destination}
                  shortURL={element.shortId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
