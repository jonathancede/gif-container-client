import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Functions imported
import { getGifById } from "../../services/gifApi";

// CSS
import "./style.css";

function GifBlock({ id }) {
  const [loaded, setLoaded] = useState(false);
  const [gifData, setGifData] = useState({});

  const history = useHistory();

  useEffect(() => {
    // This let is to solve a warning for an async function
    let isMounted = true;

    setLoaded(false);

    getGifById(id)
      .then((resp) => {
        if (isMounted) {
          setGifData(resp.data.data);
          setLoaded(true);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setLoaded(true);
          alert(error);
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  function linkToGifPage() {
    history.push(`/gifs/${id}`);
  }

  if (!loaded) {
    return <div className="gif-block gif-loading"></div>;
  }

  return (
    <div className="gif-block" onClick={linkToGifPage}>
      <img src={gifData.url} alt={gifData.title} className="gif-image" />
      <div className="gif-username hide">{gifData.owner.userName}</div>
    </div>
  );
}

export default GifBlock;
