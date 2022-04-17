import { getRecipe, modifyRecipe } from "./recipies";

const axios = require("axios");
const config = require("../../config");

let serverUrl = "";
if (config.env === "PROD") {
  serverUrl = config.serverProdUrl;
}
if (config.env === "DEV") {
  serverUrl = config.serverDevUrl;
}

export async function getSelectedRecipes() {
  try {
    const res = await axios.get(serverUrl + "/api/thisweek");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function renewRecipeSelection() {
  let req = { type: "renewSelection" };
  try {
    const res = await axios.post(serverUrl + "/api/thisweek", req);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function addRecipeToSelection() {
  let req = { type: "addRecipe" };
  try {
    const res = await axios.post(serverUrl + "/api/thisweek", req);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function removeRecipeFromSelection(item) {
  let req = { type: "removeRecipe", id: item };
  try {
    const res = await axios.post(serverUrl + "/api/thisweek", req);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
