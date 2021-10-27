import axios from "axios";

export function getRandomGifGiphy() {
  return axios({
    method: "GET",
    url: `https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`,
  });
}
