const axios = require("axios");
const SERVER_URL = process.env.REACT_ENV_SERVER_URL;

exports.createRecipe = async (newRecipe) => {
  try {
    const res = await axios.post(SERVER_URL + "/api/recipe", newRecipe);
    return res;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.getRecipe = async (id) => {
  try {
    const res = await axios.get(SERVER_URL + "/api/recipe/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.deleteRecipe = async (id) => {
  try {
    const res = await axios.delete(SERVER_URL + "/api/recipe/" + id);
    return res.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.modifyRecipe = async (id, newRecipe) => {
  try {
    const res = await axios.put(SERVER_URL + "/api/recipe/" + id, newRecipe);
    return res.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.getRecipes = async () => {
  try {
    const res = await axios.get(SERVER_URL + "/api/recipe");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
