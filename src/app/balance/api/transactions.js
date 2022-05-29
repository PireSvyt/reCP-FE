const axios = require("axios");

export async function createTransaction(newTransaction) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/transaction/",
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getTransaction(id) {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/transaction/" + id
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteTransaction(id) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/transaction/" + id
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyTransaction(id, newTransaction) {
  try {
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/transaction/" + id,
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getTransactions() {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/transaction"
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
