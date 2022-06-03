const axios = require("axios");

// Ingredients
export async function apiSetIngredientSave(ingredient) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/set/ingredient/save",
      ingredient
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetIngredientSave",
      error: err
    };
    console.error(res);
    return res;
  }
}

// Recipies
export async function apiSetRecipeSave(recipe) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/set/recipe/save",
      recipe
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetRecipeSave",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetRecipeSelect(id) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/set/recipe/select/" + id
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetRecipeSelect",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetRecipePrepare(id) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/set/recipe/prepare/" + id
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetRecipePrepare",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetRecipeDelete(id) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/set/recipe/delete/" + id
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetRecipeDelete",
      error: err
    };
    console.error(res);
    return res;
  }
}

/*


// TODO

router.post("/thisweek/renew", thisweekCtrl.renewSelection);
router.post("/thisweek/empty", thisweekCtrl.emptySelection);
router.post("/thisweek/add", thisweekCtrl.addRecipe);
router.post("/thisweek/remove/:id", thisweekCtrl.removeRecipe);

router.post("/fridge/renew", thisweekCtrl.renewSelection);
router.post("/fridge/reset/:id", thisweekCtrl.removeRecipe);
router.post("/fridge/set/:id", thisweekCtrl.removeRecipe);

router.post("/shop/renew", thisweekCtrl.renewSelection);
router.post("/shop/reset/:id", thisweekCtrl.removeRecipe);
router.post("/shop/set/:id", thisweekCtrl.removeRecipe);
*/
