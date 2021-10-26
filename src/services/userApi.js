import axios from "axios";

// Functions
import { getCurrentUserToken } from "./firebase";

export function registerNewUser(userData) {
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER_URL}users/register`,
    data: userData,
  });
}

export function getUserByFirebaseId(firebaseId) {
  const userToken = getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER_URL}users/get-user-by-firebase-id/${firebaseId}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
