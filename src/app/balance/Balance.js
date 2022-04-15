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
  ListItemButton,
  Box,
  Fab
} from "@mui/material";
import { AddIcon } from "@mui/icons-material/Add";
//import { ThemeProvider } from "@mui/material/styles";

import appcopy from "./copy";
import { theme } from "../theme";
import {
  TransactionDate,
  TransactionBy,
  TransactionFor
} from "./balancecomponents";
import {
  getTransaction,
  getTransactions,
  createTransaction,
  modifyTransaction
} from "./api/transactions";
import getBalance from "./api/balance";

require("dotenv").config();

//const LANGUAGE = process.env.REACT_ENV_LANGUAGE;
const LANGUAGE = "FR";
var selectedTransaction = "";

export default class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: "",
      date: Date()
    };
  }
  render() {
    //<ThemeProvider theme={theme}>
    return (
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <Button
            variant="contained"
            id="balance_updatetransactions"
            sx={{
              width: 3 / 7
            }}
          >
            {appcopy["title.subsection_transactions"][LANGUAGE]}
          </Button>
          <Button
            variant="contained"
            id="balance_updatesummary"
            sx={{
              width: 3 / 7
            }}
          >
            {appcopy["title.subsection_balance"][LANGUAGE]}
          </Button>
          <Fab
            id="balance_newtransaction"
            color="primary"
            sx={{ position: "fixed", bottom: 20, right: 20 }}
          >
            +
          </Fab>
        </Box>
        <div id="balance_summary"></div>
        <div id="balance_stats"></div>
        <div id="balance_transaction">
          <Paper>
            <h3>{appcopy["title.subsection_transaction"][LANGUAGE]}</h3>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 5,
                mr: 5
              }}
            >
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

              <Button
                id="balance_savetransaction"
                variant="contained"
                sx={{ m: 5, bgcolor: "" }}
              >
                {appcopy["button.save"][LANGUAGE]}
              </Button>
            </Box>
          </Paper>
        </div>
        <div id="balance_transactions"></div>
        <div id="balance_snackbar_div"></div>
      </React.Fragment>
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
  document.getElementById("balance_newtransaction").style.display = "block";
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
  document.getElementById("balance_newtransaction").style.display = "none";
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
      createTransaction(transaction).then(updateBalance());
    } else {
      // PUT
      console.log("PUT");
      modifyTransaction(transaction._id, transaction).then(updateBalance());
    }
  }
}

function updateTransactions() {
  // Hide
  document.getElementById("balance_stats").style.display = "none";
  document.getElementById("balance_transaction").style.display = "none";
  document.getElementById("balance_summary").style.display = "none";
  // Display
  document.getElementById("balance_transactions").style.display = "block";
  document.getElementById("balance_newtransaction").style.display = "block";
  //
  Moment.locale("en");
  getTransactions().then((res) => {
    const container = document.getElementById("balance_transactions");
    ReactDOM.render(
      <Paper>
        <h3>{appcopy["title.subsection_transactions"][LANGUAGE]}</h3>
        <List>
          {res.map((value) => (
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
          ))}
        </List>
      </Paper>,
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
