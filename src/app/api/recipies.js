const axios = require("axios");
const config = require("../../config");

exports.createRecipe = async (newRecipe) => {
  try {
    const res = await axios.post(config.serverUrl + "/api/recipe", newRecipe);
    return res;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.getRecipe = async (id) => {
  try {
    const res = await axios.get(config.serverUrl + "/api/recipe/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.deleteRecipe = async (id) => {
  try {
    const res = await axios.delete(config.serverUrl + "/api/recipe/" + id);
    return res.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.modifyRecipe = async (id, newRecipe) => {
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
};

exports.getRecipes = async () => {
  try {
    const res = await axios.get(config.serverUrl + "/api/recipe");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
