const axios = require("axios");
const config = require("../../config");

exports.createIngredient = async (id, newIngredient) => {
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
};

exports.getIngredient = async (id) => {
  try {
    const res = await axios.get(config.serverUrl + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.deleteIngredient = async (id) => {
  try {
    const res = await axios.delete(config.serverUrl + "/api/ingredient/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.modifyIngredient = async (id, newIngredient) => {
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
};

exports.getIngredients = async () => {
  try {
    const res = await axios.get(config.serverUrl + "/api/ingredient");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
