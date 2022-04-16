import config from "../../../config";
const axios = require("axios");

let serverUrl = "";
if (config.env === "PROD") {
  serverUrl = config.serverProdUrl;
}
if (config.env === "DEV") {
  serverUrl = config.serverDevUrl;
}

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
    const res = await axios.get(serverUrl + "/api/balance");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
