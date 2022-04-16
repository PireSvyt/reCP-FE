const axios = require("axios");
const config = require("../../config");

export async function getSelectedRecipes() {
  try {
    const res = await axios.get(config.serverUrl + "/api/thisweek");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
