import axios from "axios";

export function uploadGifCloudinary(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  data.append("folder", "gifs");

  return axios({
    method: "POST",
    url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/`,
    data: data,
  });
}
