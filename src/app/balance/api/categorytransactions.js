import config from "../../../config";
const axios = require("axios");

let serverUrl = "";
if (config.env === "PROD") {
  serverUrl = config.serverProdUrl;
}
if (config.env === "DEV") {
  serverUrl = config.serverDevUrl;
}

export async function createCategoryTransaction(newTransaction) {
  //exports.createTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.post(
      serverUrl + "/api/categorytransaction/",
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getCategoryTransaction(id) {
  //exports.getTransaction = async (id) => {
  try {
    const res = await axios.get(serverUrl + "/api/categorytransaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function deleteCategoryTransaction(id) {
  //exports.deleteTransaction = async (id) => {
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

export async function modifyCategoryTransaction(id, newTransaction) {
  //exports.modifyTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.put(
      serverUrl + "/api/categorytransaction/" + id,
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function getCategoryTransactions() {
  //exports.getTransactions = async () => {
  try {
    const res = await axios.get(serverUrl + "/api/categorytransaction");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}
