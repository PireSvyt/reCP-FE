const axios = require("axios");
const config = require("../../config");

export async function createRecipe(newRecipe) {
  try {
    const res = await axios.post(config.serverUrl + "/api/recipe", newRecipe);
    return res;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getRecipe(id) {
  try {
    const res = await axios.get(config.serverUrl + "/api/recipe/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteRecipe(id) {
  try {
    const res = await axios.delete(config.serverUrl + "/api/recipe/" + id);
    return res.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyRecipe(id, newRecipe) {
  try {
    const res = await axios.put(
      config.serverUrl + "/api/recipe/" + id,
      newRecipe
    );
    return res.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getRecipes() {
  try {
    const res = await axios.get(config.serverUrl + "/api/recipe");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
