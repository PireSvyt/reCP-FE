require("dotenv").config();
const axios = require("axios");

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiTransactionSave(transaction) {
  try {
    const res = await axios.post(apiURL + "api/transaction/save", transaction);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTransactionSave",
      error: err,
      transaction: transaction,
    };
    console.error(res);
    return res;
  }
}
export async function apiTransactionDeleteOne(id) {
  try {
    const res = await axios.post(apiURL + "api/transaction/delete/one/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTransactionDeleteOne",
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiTransactionDeleteAll() {
  try {
    const res = await axios.post(apiURL + "api/transaction/delete/all");
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTransactionDeleteAll",
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiTransactionGetOne(id) {
  try {
    const res = await axios.post(apiURL + "api/transaction/item/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTransactionGetOne " + id,
      transaction: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}
export async function apiTransactionGetMany(need) {
  try {
    const res = await axios.post(apiURL + "api/transaction/list", need);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTransactionGetMany " + need,
      transactions: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}
