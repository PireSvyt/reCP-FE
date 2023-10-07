require("dotenv").config();
const axios = require("axios");

let apiURL = process.env.TESTSUITE_SERVER_URL;

exports.apiTransactionSave = async function (transaction) {
  try {
    const res = await axios.post(apiURL + "/api/transaction/save", transaction);
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
};
exports.apiTransactionDeleteOne = async function (id) {
  try {
    const res = await axios.post(apiURL + "/api/transaction/delete/one/" + id);
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
};
exports.apiTransactionDeleteAll = async function () {
  try {
    const res = await axios.post(apiURL + "/api/transaction/delete/all");
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
};
exports.apiTransactionGetOne = async function (id) {
  try {
    const res = await axios.post(apiURL + "/api/transaction/item/" + id);
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
};
exports.apiTransactionGetMany = async function (need) {
  try {
    const res = await axios.post(apiURL + "/api/transaction/list", need);
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
};
