const axios = require("axios");
const config = require("../../../../config/config");

exports.getBalance = async () => {
  try {
    const res = await axios.get(config.serverUrl + "/api/balance");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
