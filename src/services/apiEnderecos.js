import axios from 'axios';

const api = axios.create({
  baseURL: `https://s3cth09yt8.execute-api.us-east-1.amazonaws.com/Dev`
});

export default api;