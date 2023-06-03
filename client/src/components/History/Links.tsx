import { FunctionComponent, useEffect, useState } from "react";
import Linkcards from "./Linkcards";
import Loader from "../Loader";
import { getHistory } from "../../utils/rest";

const Links: FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await getHistory();
        const data = await result;
        setData(data);
      };
      fetchData();
    } catch (error: Error | any) {
      setError(error.message);
    }
  }, []);

  return (
    <div>
      {!data.length && !error ? (
        <Loader />
      ) : (
        <div className="flex justify-center px-4 md:px-20 pt-10 pb-20">
          <div className="bg-transparent rounded-md p-4 w-screen">
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
