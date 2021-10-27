import React, { useEffect, useState } from "react";

// HoC
import withHeader from "../../hoc/withHeader";

// Components
import GifBlock from "../../components/GifBlock";

// Functions imported
import { getAllGifs } from "../../services/gifApi";

// CSS
import "./style.css";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoaded(false);

    getAllGifs()
      .then((resp) => {
        setResults(resp.data.result);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(true);
        alert(error);
      });
  }, []);

  return (
    <main>
      <div className="title-wrapper-home">
        <h1 className="title-search">All GIFs</h1>
      </div>
      {!loaded ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="gifs-container" key="-1">
          {results.map((result, index) => (
            <GifBlock id={result._id} key={index} />
          ))}
        </div>
      )}
    </main>
  );
}

export default withHeader(Home);
