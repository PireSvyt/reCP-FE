import * as React from "react";
import ReactDOM from "react-dom";
import Moment from "moment";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemButton
} from "@mui/material";
import appcopy from "./copy";

import {
  TransactionDate,
  TransactionBy,
  TransactionFor
} from "./balancecomponents";

import { getTransaction, getTransactions } from "./api/transactions";
import getBalance from "./api/balance";

require("dotenv").config();

const LANGUAGE = process.env.REACT_ENV_LANGUAGE;
var selectedTransaction = "";

console.log("LANGUAGE : " + LANGUAGE);
console.log("VERCEL_ENV : " + process.env.VERCEL_ENV);

export default class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: "summary",
      transaction: "",
      date: Date()
    };
  }
  render() {
    return (
      <div>
        <h2>{appcopy["title.section_mybalance"][LANGUAGE]}</h2>
        <div>
          <Button variant="text" id="balance_newtransaction">
            ADD
          </Button>
          <Button variant="text" id="balance_updatesummary">
            {appcopy["button.renew"][LANGUAGE]}
          </Button>
          <Button variant="text" id="balance_updatetransactions">
            {appcopy["button.transactions"][LANGUAGE]}
          </Button>
        </div>
        <div id="balance_summary"></div>
        <div id="balance_stats"></div>
        <div id="balance_transaction">
          <Paper>
            <h3>{appcopy["title.subsection_transaction"][LANGUAGE]}</h3>
            <Button id="balance_savetransaction" variant="text">
              {appcopy["button.save"][LANGUAGE]}
            </Button>
            <TextField
              id="transaction_name"
              label={appcopy["input.name"][LANGUAGE]}
              variant="standard"
            />
            <TransactionDate />
            <TextField
              id="transaction_amount"
              label={appcopy["input.amount"][LANGUAGE]}
              variant="standard"
            />

            <h4>{appcopy["text.by"][LANGUAGE]}</h4>
            <TransactionBy />

            <h4>{appcopy["text.for"][LANGUAGE]}</h4>
            <TransactionFor />

            <TextField
              id="transaction_category"
              label={appcopy["input.category"][LANGUAGE]}
              variant="standard"
            />
          </Paper>
        </div>
        <div id="balance_transactions"></div>
        <div id="balance_snackbar_div"></div>
      </div>
    );
  }
  componentDidMount() {
    // Hide
    document.getElementById("balance_stats").style.display = "none";
    document.getElementById("balance_transaction").style.display = "none";
    document.getElementById("balance_transactions").style.display = "none";
    // Bind
    document.getElementById("balance_newtransaction").onclick = function () {
      openTransaction("");
    };
    document.getElementById("balance_updatesummary").onclick = function () {
      updateBalance();
    };
    document.getElementById("balance_savetransaction").onclick = function () {
      saveTransaction();
    };
    document.getElementById(
      "balance_updatetransactions"
    ).onclick = function () {
      updateTransactions();
    };
    // Update
    updateBalance();
  }
}
function updateBalance() {
  // Hide
  document.getElementById("balance_stats").style.display = "none";
  document.getElementById("balance_transaction").style.display = "none";
  document.getElementById("balance_transactions").style.display = "none";
  // Display
  document.getElementById("balance_summary").style.display = "block";
  //
  getBalance().then((res) => {
    ReactDOM.render(
      <div>
        <Paper>
          <h3>{appcopy["title.subsection_balance"][LANGUAGE]}</h3>
          <List>
            <ListItem key={"Alice"}>
              <ListItemText
                primary={`Alice : ${Math.round(res.Alice * 100) / 100} €`}
              />
            </ListItem>
            <ListItem key={"Pierre"}>
              <ListItemText
                primary={`Pierre : ${Math.round(res.Pierre * 100) / 100} €`}
              />
            </ListItem>
          </List>
        </Paper>
      </div>,
      document.getElementById("balance_summary")
    );
  });
}

function openTransaction(id) {
  function openTransactionUpdate(transaction) {
    // Name
    document.getElementById("transaction_name").value = transaction.name;
    // Date
    document.getElementById(
      "transaction_date"
    ).value = transactionDateToInputFormat(transaction.date);
    // Amount
    document.getElementById("transaction_amount").value = transaction.amount;
    // By
    for (const radioButton of document.querySelectorAll(
      '[name="transaction_by"]'
    )) {
      if (radioButton.checked === false) {
        if (transaction.by === radioButton.value) {
          radioButton.click();
        }
      }
    }
    // For
    for (const checkButton of document.querySelectorAll(
      '[name="transaction_for"]'
    )) {
      if (checkButton.checked === false) {
        if (transaction.for.includes(checkButton.value)) {
          checkButton.click();
        }
      } else {
        if (!transaction.for.includes(checkButton.value)) {
          checkButton.click();
        }
      }
    }
    // Category
    document.getElementById("transaction_category").value =
      transaction.category;
  }

  // Hide
  document.getElementById("balance_summary").style.display = "none";
  document.getElementById("balance_stats").style.display = "none";
  document.getElementById("balance_transactions").style.display = "none";
  // Display
  document.getElementById("balance_transaction").style.display = "block";

  if (id !== "") {
    // Load
    getTransaction(id).then((res) => {
      selectedTransaction = res._id;
      openTransactionUpdate(res);
    });
  } else {
    selectedTransaction = "";
    openTransactionUpdate({
      _id: "",
      name: "",
      date: Date(),
      amount: "",
      by: "",
      for: ["Alice", "Pierre"],
      category: ""
    });
  }
}

function saveTransaction() {
  // Retrieve inputs
  var transaction = {
    _id: selectedTransaction,
    name: "",
    date: null,
    amount: null,
    by: "",
    for: [],
    category: ""
  };
  transaction.name = document.getElementById("transaction_name").value;
  transaction.date = transactionDateFromInputFormat(
    document.getElementById("transaction_date").value
  );
  transaction.amount = document.getElementById("transaction_amount").value;
  for (const radioButton of document.querySelectorAll(
    '[name="transaction_by"]'
  )) {
    if (radioButton.checked === true) {
      transaction.by = radioButton.value;
      break;
    }
  }
  for (const checkButton of document.querySelectorAll(
    '[name="transaction_for"]'
  )) {
    if (checkButton.checked === true) {
      transaction.for.push(checkButton.value);
    }
  }
  transaction.category = document.getElementById("transaction_category").value;
  // Check inputs
  let save = true;
  let errors = [];
  if (transaction.name === "") {
    save = false;
    errors.push("Nom vide");
  }
  if (transaction.date === null) {
    save = false;
    errors.push("Date vide");
  }
  if (transaction.amount === null) {
    save = false;
    errors.push("Montant vide");
  }
  if (transaction.by === "") {
    save = false;
    errors.push("Payé par vide");
  }
  if (transaction.for === []) {
    save = false;
    errors.push("Payé pour vide");
  }

  // TODO : Sncakbar

  // Save or not?
  if (errors !== []) {
    console.log(errors);
  }

  // Post or publish
  if (save === true) {
    console.log(transaction);
    if (transaction._id === "") {
      // POST
      console.log("POST");
    } else {
      // PUT
      console.log("PUT");
    }
    updateBalance();
  }
}

function updateTransactions() {
  // List items
  function transactionListItem(value) {
    console.log(value);
    return (
      <ListItem key={`${value._id}`} id={`${value._id}`}>
        <ListItemButton onClick={() => openTransaction(value._id)}>
          <ListItemText
            primary={`${value.name}`}
            secondary={`${value.amount} €, le ${Moment(value.date).format(
              "DD/MM/YYYY"
            )}`}
          />
        </ListItemButton>
      </ListItem>
    );
  }
  // Hide
  document.getElementById("balance_stats").style.display = "none";
  document.getElementById("balance_transaction").style.display = "none";
  document.getElementById("balance_summary").style.display = "none";
  // Display
  document.getElementById("balance_transactions").style.display = "block";
  //
  Moment.locale("en");
  getTransactions().then((res) => {
    console.log(res);
    const container = document.getElementById("balance_transactions");
    ReactDOM.render(
      <List>
        {res.forEach((value) => {
          transactionListItem(value);
        })}
      </List>,
      container
    );
  });
}

function transactionDateToInputFormat(date) {
  let internalDate = new Date(date);
  var textDate = {
    year: internalDate.getFullYear(),
    month: internalDate.getMonth() + 1,
    day: internalDate.getDate()
  };
  if (textDate.month < 10) {
    textDate.month = "0" + textDate.month;
  }
  if (textDate.day < 10) {
    textDate.day = "0" + textDate.day;
  }
  textDate.final = textDate.year + "-" + textDate.month + "-" + textDate.day;
  return textDate.final;
}
function transactionDateFromInputFormat(date) {
  let internalDate = new Date(date);
  return internalDate;
}
