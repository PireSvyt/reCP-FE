const axios = require("axios");

export async function createCategoryTransaction(newCategoryTransaction) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/categorytransaction/",
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
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/categorytransaction/" + id
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteCategoryTransaction(id) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/categorytransaction/" + id
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyCategoryTransaction(id, newCategoryTransaction) {
  try {
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/categorytransaction/" + id,
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
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/categorytransaction"
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
