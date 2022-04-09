const axios = require("axios");
const SERVER_URL = process.env.REACT_ENV_SERVER_URL;

exports.createIngredient = async (id, newIngredient) => {
  try {
    const res = await axios.post(
      SERVER_URL + "/api/ingredient/" + id,
      newIngredient
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.getIngredient = async (id) => {
  try {
    const res = await axios.get(SERVER_URL + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.deleteIngredient = async (id) => {
  try {
    const res = await axios.delete(SERVER_URL + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.modifyIngredient = async (id, newIngredient) => {
  try {
    const res = await axios.put(
      SERVER_URL + "/api/ingredient/" + id,
      newIngredient
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.getIngredients = async () => {
  try {
    const res = await axios.get(SERVER_URL + "/api/ingredient");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
