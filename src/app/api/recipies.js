const axios = require("axios");

export async function createRecipe(newRecipe) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/recipe",
      newRecipe
    );
    return res;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getRecipe(id) {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/recipe/" + id
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteRecipe(id) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/recipe/" + id
    );
    return res.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyRecipe(id, newRecipe) {
  try {
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/recipe/" + id,
      newRecipe
    );
    return res.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getRecipies() {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/recipe"
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
