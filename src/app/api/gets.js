const axios = require("axios");

let apiURL = process.env.REACT_APP_SERVER_URL_PROD;
if (process.env.NODE_ENV === "development") {
  apiURL = process.env.REACT_APP_SERVER_URL_DEV;
}

// Ingredients
export async function apiGetIngredient(id) {
  try {
    const res = await axios.post(apiURL + "/api/get/ingredient/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetIngredient " + id,
      recipe: [],
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiGetIngredients(need) {
  try {
    const res = await axios.post(apiURL + "/api/get/ingredient/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetIngredients " + need,
      ingredients: [],
      error: err
    };
    console.error(res);
    return res;
  }
}

// Recipies
export async function apiGetRecipe(id) {
  try {
    const res = await axios.post(apiURL + "/api/get/recipe/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetRecipe " + id,
      recipe: [],
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiGetRecipies(need) {
  try {
    const res = await axios.post(apiURL + "/api/get/recipe/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetRecipies " + need,
      recipies: [],
      error: err
    };
    console.error(res);
    return res;
  }
}
