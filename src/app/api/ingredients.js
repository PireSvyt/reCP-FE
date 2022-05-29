const axios = require("axios");

let serverUrl = process.env.SERVER_URL;

export async function createIngredient(id, newIngredient) {
  try {
    const res = await axios.post(
      serverUrl + "/api/ingredient/" + id,
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
    const res = await axios.get(serverUrl + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteIngredient(id) {
  try {
    const res = await axios.delete(serverUrl + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyIngredient(id, newIngredient) {
  try {
    const res = await axios.put(
      serverUrl + "/api/ingredient/" + id,
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
    const res = await axios.get(serverUrl + "/api/ingredient");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
