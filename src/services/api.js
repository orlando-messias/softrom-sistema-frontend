import axios from 'axios';

const api = axios.create({
  baseURL: `https://3prn0ipq28.execute-api.us-east-1.amazonaws.com/Dev`
});

export default api;