const axios = require("axios");

const url = "https://oesepd.sse.codesandbox.io";

exports.createRecipe = (id, newRecipe) => {
  axios.post(url + "/api/recipe/" + id, newRecipe).then((res) => {
    return res.status;
  });
};

exports.getRecipe = (id) => {
  axios.get(url + "/api/recipe/" + id).then((res) => {
    return res.data;
  });
};

exports.deleteRecipe = (id) => {
  axios.delete(url + "/api/recipe/" + id).then((res) => {
    return res.status;
  });
};

exports.modifyRecipe = (id, newRecipe) => {
  axios.put(url + "/api/recipe/" + id, newRecipe).then((res) => {
    return res.status;
  });
};

exports.getRecipes = () => {
  axios.get(url + "/api/recipe").then((res) => {
    return res.data;
  });
};
