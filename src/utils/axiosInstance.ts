import axios from 'axios';

const baseURL = 'https://fantasy.premierleague.com/api';

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
