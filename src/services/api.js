import axios from "axios";

const api = (token) =>
  axios.create({
    //baseURL: `https://s3cth09yt8.execute-api.us-east-1.amazonaws.com/Dev`,
    baseURL: `http://localhost:3000/api/v1/public`,
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
