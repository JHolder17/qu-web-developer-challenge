import axios from 'axios';

const API_BASE = 'https://official-joke-api.appspot.com';

export const getRandomJoke = async () => {
  const res = await axios.get(`${API_BASE}/random_joke`);
  return res.data;
};

export const getOneHundredJokes = async () => {
  const res = await axios.get(`${API_BASE}/jokes/random/100`);
  return res.data;
};