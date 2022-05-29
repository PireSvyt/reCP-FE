const axios = require("axios");

export async function createIngredient(id, newIngredient) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/ingredient/" + id,
      newIngredient
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getIngredient(id) {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/ingredient/" + id
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteIngredient(id) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/ingredient/" + id
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyIngredient(id, newIngredient) {
  try {
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/ingredient/" + id,
      newIngredient
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getIngredients() {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/ingredient"
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
