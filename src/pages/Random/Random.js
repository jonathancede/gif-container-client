import React, { useState, useEffect } from "react";

// Functions imported
import { getRandomGifGiphy } from "../../services/giphy";

// Icons
import { Autorenew } from "@mui/icons-material";

// HoC
import withHeader from "../../hoc/withHeader";

// CSS
import "./style.css";

function Random() {
  const [loaded, setLoaded] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getRandomGif();
  }, []);

  function getRandomGif() {
    setLoaded(false);
    getRandomGifGiphy()
      .then((resp) => {
        setUrl(resp.data.data.images.original.url);
        setLoaded(true);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function linkToUrlImage() {
    const win = window.open(url);
    win.focus();
  }

  return (
    <main>
      <div className="gifs-container-gif-page">
        <h1 className="gif-page-title">Random GIF</h1>
        {!loaded ? (
          <div className="spinner-random">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <img
            src={url}
            alt={url}
            className="gif-image-gif-page"
            onClick={linkToUrlImage}
          />
        )}
        <div className="renew-wrapper" onClick={getRandomGif}>
          <Autorenew className="renew-icon" fontSize="large" />
          <div className="giphy-text">Provided by GIPHY</div>
        </div>
      </div>
    </main>
  );
}

export default withHeader(Random);
