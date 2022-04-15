import config from "../../../config";
const axios = require("axios");

/*
exports.getBalance = async () => {
  try {
    const res = await axios.get(SERVER_URL + "/api/balance");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
*/
export default async function getBalance() {
  try {
    const res = await axios.get(config.serverUrl + "/api/balance");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
