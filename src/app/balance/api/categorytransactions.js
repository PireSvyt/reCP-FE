const axios = require("axios");

let serverUrl = process.env.SERVER_URL;

export async function createCategoryTransaction(newCategoryTransaction) {
  try {
    const res = await axios.post(
      serverUrl + "/api/categorytransaction/",
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
    const res = await axios.get(serverUrl + "/api/categorytransaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteCategoryTransaction(id) {
  try {
    const res = await axios.delete(
      serverUrl + "/api/categorytransaction/" + id
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
      serverUrl + "/api/categorytransaction/" + id,
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
    const res = await axios.get(serverUrl + "/api/categorytransaction");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
