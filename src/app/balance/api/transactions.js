const axios = require("axios");
const config = require("../../../../config/config");

exports.createTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.post(
      config.serverUrl + "/api/transaction/" + id,
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.getTransaction = async (id) => {
  try {
    const res = await axios.get(config.serverUrl + "/api/transaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.deleteTransaction = async (id) => {
  try {
    const res = await axios.delete(config.serverUrl + "/api/transaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.modifyTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.put(
      config.serverUrl + "/api/transaction/" + id,
      newTransaction
    );
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.getTransactions = async () => {
  try {
    const res = await axios.get(config.serverUrl + "/api/transaction");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
