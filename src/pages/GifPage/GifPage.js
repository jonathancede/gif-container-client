import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

// Functions imported
import { getGifById } from "../../services/gifApi";

// HoC
import withHeader from "../../hoc/withHeader";

// CSS
import "./style.css";

function GifPage() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [gifData, setGifData] = useState({});

  useEffect(() => {
    setLoaded(false);

    getGifById(id)
      .then((resp) => {
        setGifData(resp.data.data);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(true);
        alert(error);
      });
    // eslint-disable-next-line
  }, []);

  function linkToUrlImage() {
    const win = window.open(gifData.url);
    win.focus();
  }

  if (!loaded) {
    return (
      <main>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="gifs-container-gif-page">
        <h1 className="gif-page-title">{gifData.title}</h1>
        <img
          src={gifData.url}
          alt={gifData.title}
          className="gif-image-gif-page"
          onClick={linkToUrlImage}
        />
        <div className="gif-page-information-wrapper">
          <div className="section-gif-page border-orange">
            <div className="title-section">GIF</div>
            <div className="element-section">
              Uploaded at {gifData.createdAt.substr(0, 10)}
            </div>
            <div className="element-section">{gifData.totalViews} views</div>
            <div className="element-section">
              {gifData.favUsers.length} likes
            </div>
            <div className="element-section">
              <div className="bold">Tags:</div>
              {gifData.tags.map((tag, index) => (
                <div className="tag-element-section" key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="section-gif-page border-green">
            <div className="title-section">Owner</div>
            <div className="element-section">
              {gifData.owner.firstName} {gifData.owner.lastName}
            </div>
            <div className="element-section">
              Username: {gifData.owner.userName}
            </div>
            <div className="element-section">Email: {gifData.owner.email}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withHeader(GifPage);
