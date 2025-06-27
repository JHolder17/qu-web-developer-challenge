import axios from 'axios';

const API_BASE = 'https://official-joke-api.appspot.com';

export const getRandomJoke = async () => {
  const res = await axios.get(`${API_BASE}/random_joke`);
  return res.data;
};