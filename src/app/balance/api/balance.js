const axios = require("axios");

/*
exports.getBalance = async () => {
  try {
    const res = await axios.get(REACT_APP_SERVER_URL + "/api/balance");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
*/
export default async function getBalance() {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/balance"
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
