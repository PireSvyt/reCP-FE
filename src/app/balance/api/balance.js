const axios = require("axios");
const SERVER_URL = process.env.REACT_ENV_SERVER_URL;

exports.getBalance = async () => {
  try {
    const res = await axios.get(SERVER_URL + "/api/balance");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
