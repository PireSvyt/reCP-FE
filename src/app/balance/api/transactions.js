const axios = require("axios");
const SERVER_URL = process.env.REACT_ENV_SERVER_URL;

exports.createTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.post(
      SERVER_URL + "/api/transaction/" + id,
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
    const res = await axios.get(SERVER_URL + "/api/transaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.deleteTransaction = async (id) => {
  try {
    const res = await axios.delete(SERVER_URL + "/api/transaction/" + id);
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

exports.modifyTransaction = async (id, newTransaction) => {
  try {
    const res = await axios.put(
      SERVER_URL + "/api/transaction/" + id,
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
    const res = await axios.get(SERVER_URL + "/api/transaction");
    return res.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
