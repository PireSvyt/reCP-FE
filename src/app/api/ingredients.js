const axios = require("axios");
const config = require("../../config");

export async function createIngredient(id, newIngredient) {
  try {
    const res = await axios.post(
      config.serverUrl + "/api/ingredient/" + id,
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
    const res = await axios.get(config.serverUrl + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteIngredient(id) {
  try {
    const res = await axios.delete(config.serverUrl + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyIngredient(id, newIngredient) {
  try {
    const res = await axios.put(
      config.serverUrl + "/api/ingredient/" + id,
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
    const res = await axios.get(config.serverUrl + "/api/ingredient");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
