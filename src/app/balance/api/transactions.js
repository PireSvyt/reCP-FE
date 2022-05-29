const axios = require("axios");

let serverUrl = process.env.SERVER_URL;

export async function createTransaction(newTransaction) {
  //exports.createTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.post(
      serverUrl + "/api/transaction/",
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getTransaction(id) {
  //exports.getTransaction = async (id) => {
  try {
    console.log("getTransaction " + id);
    const res = await axios.get(serverUrl + "/api/transaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteTransaction(id) {
  //exports.deleteTransaction = async (id) => {
  try {
    const res = await axios.delete(serverUrl + "/api/transaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function modifyTransaction(id, newTransaction) {
  //exports.modifyTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.put(
      serverUrl + "/api/transaction/" + id,
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getTransactions() {
  //exports.getTransactions = async () => {
  try {
    const res = await axios.get(serverUrl + "/api/transaction");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
