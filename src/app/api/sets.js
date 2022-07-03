const axios = require("axios");

let apiURL = process.env.REACT_APP_SERVER_URL_PROD;
if (process.env.NODE_ENV === "development") {
  apiURL = process.env.REACT_APP_SERVER_URL_DEV;
}

// Ingredients
export async function apiSetIngredientSave(ingredient) {
  try {
    const res = await axios.post(
      apiURL + "/api/set/ingredient/save",
      ingredient
    );
    return res.data;
  } catch (err) {
    let res = {
      status: 400,
      message: "error on apiSetIngredientSave",
      error: err,
      ingredient: ingredient
    };
    return res;
  }
}

// Recipies
export async function apiSetRecipeSave(recipe) {
  try {
    const res = await axios.post(apiURL + "/api/set/recipe/save", recipe);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetRecipeSave",
      error: err,
      recipe: recipe
    };
    console.error(res);
    return res;
  }
}
export async function apiSetRecipeSelect(id) {
  try {
    const res = await axios.post(apiURL + "/api/set/recipe/select/" + id);
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
export async function apiSetRecipeDelete(id) {
  try {
    const res = await axios.post(apiURL + "/api/set/recipe/delete/" + id);
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

// Thisweek
export async function apiSetThisweekEmpty() {
  try {
    const res = await axios.post(apiURL + "/api/set/thisweek/empty");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekEmpty",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetThisweekRecipeAdd() {
  try {
    const res = await axios.post(apiURL + "/api/set/thisweek/add");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekRecipeAdd",
      error: err
    };
    return res;
  }
}
export async function apiSetThisweekRenew() {
  try {
    const res = await axios.post(apiURL + "/api/set/thisweek/renew");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekRenew",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetThisweekRecipeRemove(id) {
  try {
    const res = await axios.post(apiURL + "/api/set/recipe/select/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekRecipeRemove",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetThisweekRecipeReplace(id) {
  try {
    const res = await axios.post(apiURL + "/api/set/recipe/recplace/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekRecipeReplace",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetThisweekRecipeScale(id, inc) {
  try {
    let res = await axios.post(
      apiURL + "/api/set/recipe/scale" + inc + "/" + id
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekRecipeScale",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetThisweekRecipePrepare(id) {
  try {
    const res = await axios.post(apiURL + "/api/set/recipe/prepare/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekRecipePrepare",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetThisweekNeeds() {
  try {
    const res = await axios.post(apiURL + "/api/set/thisweek/needs");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetThisweekNeeds",
      error: err
    };
    console.error(res);
    return res;
  }
}

// Fridge
export async function apiSetFridgeEmpty() {
  try {
    const res = await axios.post(apiURL + "/api/set/fridge/empty");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetFridgeEmpty",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetFridgeHave(ingredient) {
  try {
    const res = await axios.post(
      apiURL + "/api/set/fridge/have/" + ingredient._id,
      ingredient
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetFridgeHave",
      error: err
    };
    console.error(res);
    return res;
  }
}

// Shopping
export async function apiSetShoppingEmpty() {
  try {
    const res = await axios.post(apiURL + "/api/set/shopping/empty");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetShoppingEmpty",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetShoppingTake(ingredient) {
  try {
    const res = await axios.post(
      apiURL + "/api/set/shopping/take/" + ingredient._id,
      ingredient
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetShoppingTake",
      error: err
    };
    console.error(res);
    return res;
  }
}
export async function apiSetShoppingAddtofridge() {
  try {
    const res = await axios.post(apiURL + "/api/set/shopping/addtofridge");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetShoppingAddtofridge",
      error: err
    };
    console.error(res);
    return res;
  }
}

// Transactions
export async function apiSetTransactionSave(transaction) {
  try {
    const res = await axios.post(
      apiURL + "/api/set/transaction/save",
      transaction
    );
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetTransactionSave",
      error: err,
      transaction: transaction
    };
    console.error(res);
    return res;
  }
}
export async function apiSetTransactionDelete(id) {
  try {
    const res = await axios.post(apiURL + "/api/set/transaction/delete/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetTransactionDelete",
      error: err
    };
    console.error(res);
    return res;
  }
}

// Categories
export async function apiSetCategorySave(category) {
  try {
    const res = await axios.post(apiURL + "/api/set/category/save", category);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiSetCategorySave",
      error: err,
      category: category
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
