import { getRecipe, modifyRecipe } from "./recipies";

const axios = require("axios");

export async function getSelectedRecipes() {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/thisweek"
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function renewRecipeSelection() {
  let req = { type: "renewSelection" };
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/thisweek",
      req
    );
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function addRecipeToSelection() {
  let req = { type: "addRecipe" };
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/thisweek",
      req
    );
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function removeRecipeFromSelection(item) {
  let req = { type: "removeRecipe", id: item };
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/thisweek",
      req
    );
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
