import axios from 'axios';

const api = (token) => axios.create({
  baseURL: `https://s3cth09yt8.execute-api.us-east-1.amazonaws.com/Dev`,
  headers: { Authorization: `Bearer ${token}`}
});

export default api;