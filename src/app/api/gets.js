const axios = require("axios");

let apiURL = process.env.REACT_APP_SERVER_URL_PROD;
if (process.env.NODE_ENV === "development") {
  apiURL = process.env.REACT_APP_SERVER_URL_DEV;
}

// Ingredients
export async function apiGetIngredient(id) {
  try {
    const res = await axios.post(apiURL + "api/get/ingredient/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetIngredient " + id,
      ingredient: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiGetIngredients(need) {
  try {
    const res = await axios.post(apiURL + "api/get/ingredient/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetIngredients " + need,
      ingredients: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}

// Shelfs
export async function apiGetShelf(id) {
  try {
    const res = await axios.post(apiURL + "api/get/shelf/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetShelf " + id,
      shelf: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiGetShelfs(need) {
  try {
    const res = await axios.post(apiURL + "api/get/shelf/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetShelfs " + need,
      shelfs: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}

// Shops
export async function apiGetShop(id) {
  try {
    const res = await axios.post(apiURL + "api/get/shop/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetShop " + id,
      shop: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiGetShops(need) {
  try {
    const res = await axios.post(apiURL + "api/get/shop/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetShops " + need,
      shops: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}

// Recipies
export async function apiGetRecipe(id) {
  try {
    const res = await axios.post(apiURL + "api/get/recipe/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetRecipe " + id,
      recipe: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiGetRecipies(need) {
  try {
    const res = await axios.post(apiURL + "api/get/recipe/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetRecipies " + need,
      recipies: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}

// Categories
export async function apiGetCategory(id) {
  try {
    const res = await axios.post(apiURL + "api/get/category/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetCategory " + id,
      category: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiGetCategories(need) {
  try {
    const res = await axios.post(apiURL + "api/get/category/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGetCategories " + need,
      categories: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}
