const axios = require("axios");

let apiURL = process.env.REACT_APP_SERVER_URL_PROD;
if (process.env.NODE_ENV === "development") {
  apiURL = process.env.REACT_APP_SERVER_URL_DEV;
}

export async function createCategoryTransaction(newCategoryTransaction) {
  try {
    const res = await axios.post(
      apiURL + "/api/categorytransaction/",
      newCategoryTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getCategoryTransaction(id) {
  try {
    const res = await axios.get(apiURL + "/api/categorytransaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteCategoryTransaction(id) {
  try {
    const res = await axios.delete(apiURL + "/api/categorytransaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyCategoryTransaction(id, newCategoryTransaction) {
  try {
    const res = await axios.put(
      apiURL + "/api/categorytransaction/" + id,
      newCategoryTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getCategoryTransactions() {
  try {
    const res = await axios.get(apiURL + "/api/categorytransaction");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
