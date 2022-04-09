const axios = require("axios");
const SERVER_URL = process.env.REACT_ENV_SERVER_URL;

export default async function getBalance() {
  try {
    const res = await axios.get(SERVER_URL + "/api/balance");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
