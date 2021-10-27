import axios from "axios";

// Functions
import { getCurrentUserToken } from "./firebase";

export function getAllGifs() {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER_URL}gifs/get-all`,
  });
}

export async function uploadNewGif(gifData) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER_URL}gifs/upload`,
    data: gifData,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function getGifById(id) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER_URL}gifs/get-by-id/${id}`,
  });
}

export function getGifsByTitle(query) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER_URL}gifs/get-gifs-by-title/${query}`,
  });
}

export function getGifsByOwner(query) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER_URL}gifs/get-gifs-by-username/${query}`,
  });
}

export function getGifsByTag(query) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER_URL}gifs/get-gifs-by-tag/${query}`,
  });
}
