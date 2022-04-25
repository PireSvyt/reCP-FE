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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Swipeable from "react-mui-swipeable";

import config from "../../config";
import appcopy from "./copy";
import {
  TransactionDate,
  TransactionBy,
  TransactionFor
} from "./balancecomponents";
import {
  getTransaction,
  getTransactions,
  createTransaction,
  modifyTransaction,
  deleteTransaction
} from "./api/transactions";
import { getCategoryTransaction } from "./api/categorytransactions";
import getBalance from "./api/balance";
import {
  CategorySelector,
  CategorySelectorSetValue,
  CategorySelectorGetValue
} from "./autocomplete";
import DialogTransaction from "./DialogTransaction";

var selectedTransaction = "";
let debug = true;

export default class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: "",
      transactionOpen: false
    };
    this.updateTransactions = this.updateTransactions.bind(this);
    this.handleCloseTransaction = this.handleCloseTransaction.bind(this);
  }
  handleCloseTransaction() {
    this.setState(
      (prevState, props) => ({
        transaction: prevState.transaction,
        transactionOpen: false
      }),
      () => {
        if (debug) {
          console.log("this.state");
          console.log(this.state);
        }
      }
    );
  }
  render() {
    return (
      <div>
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
            onClick={this.updateTransactions}
          >
            {appcopy["title.subsection_transactions"][config.app.language]}
          </Button>
          <Button variant="contained" id="balance_updatesummary">
            {appcopy["title.section_mybalance"][config.app.language]}
          </Button>
        </Box>
        <Fab color="primary" sx={{ position: "fixed", right: 20, top: 80 }}>
          <AddIcon
            onClick={() => {
              if (debug) {
                console.log("newTransaction.onClick ");
              }
              this.setState(
                (prevState, props) => ({
                  transaction: "",
                  transactionOpen: true
                }),
                () => {
                  if (debug) {
                    console.log("this.state");
                    console.log(this.state);
                  }
                }
              );
            }}
          />
        </Fab>
        <DialogTransaction
          id="dialogTransaction"
          transaction={this.state.transaction}
          open={false}
          onsave={updateBalance}
          onclose={this.handleCloseTransaction}
        />
        <div id="balance_summary"></div>
        <div id="balance_transaction">
          <Paper>
            <h3>
              {appcopy["title.subsection_transaction"][config.app.language]}
            </h3>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <TextField
                id="transaction_name"
                label={appcopy["input.name"][config.app.language]}
                variant="standard"
              />
              <TransactionDate />
              <TextField
                id="transaction_amount"
                label={appcopy["input.amount"][config.app.language]}
                variant="standard"
              />
              <TransactionBy />
              <TransactionFor />
              <CategorySelector />
              <Button
                id="balance_savetransaction"
                variant="contained"
                sx={{ m: 5, bgcolor: "" }}
              >
                {appcopy["button.save"][config.app.language]}
              </Button>
            </Box>
          </Paper>
        </div>
        <div id="balance_transactions"></div>
        <div id="balance_snackbar_div"></div>
      </div>
    );
  }
  componentDidMount() {
    // Hide
    document.getElementById("balance_transaction").style.display = "none";
    document.getElementById("balance_transactions").style.display = "none";
    // Bind
    document.getElementById("balance_updatesummary").onclick = function () {
      updateBalance();
    };
    document.getElementById("balance_savetransaction").onclick = function () {
      saveTransaction();
    };
    /*document.getElementById(
      "balance_updatetransactions"
    ).onclick = function () {
      this.updateTransactions();
    };*/
    // Update
    updateBalance();
  }
  updateTransactions() {
    // Hide
    document.getElementById("balance_transaction").style.display = "none";
    document.getElementById("balance_summary").style.display = "none";
    // Display
    document.getElementById("balance_transactions").style.display = "block";
    //<Swipeable onSwipeLeft={() => handleSwipeLeft(value._id)}>
    function handleSwipeLeft(id) {
      console.log("handleSwipeLeft " + id);
    }
    //
    Moment.locale("en");
    getTransactions().then((res) => {
      const container = document.getElementById("balance_transactions");
      ReactDOM.render(
        <Paper>
          <h3>
            {appcopy["title.subsection_transactions"][config.app.language]}
          </h3>
          <List dense={true}>
            {res.map((value) => (
              <ListItem key={`${value._id}`} id={`${value._id}`}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      if (debug) {
                        console.log("updateTransactions.onClick " + value._id);
                      }
                      this.setState(
                        (prevState, props) => ({
                          transaction: value._id,
                          transactionOpen: true
                        }),
                        () => {
                          if (debug) {
                            console.log("this.state");
                            console.log(this.state);
                          }
                        }
                      );
                    }}
                  >
                    <EditIcon />
                  </ListItemButton>
                  <ListItemText
                    primary={`${value.name}`}
                    secondary={`${value.amount} €, le ${Moment(
                      value.date
                    ).format("DD/MM/YYYY")}`}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>,
        container
      );
    });
  }
}
function updateBalance() {
  // Hide
  document.getElementById("balance_transaction").style.display = "none";
  document.getElementById("balance_transactions").style.display = "none";
  // Display
  document.getElementById("balance_summary").style.display = "block";
  //
  getBalance().then((res) => {
    ReactDOM.render(
      <div>
        <Paper>
          <h3>
            {appcopy["title.subsection_balanceperuser"][config.app.language]}
          </h3>
          <List>
            <ListItem key={"Alice"}>
              <ListItemText
                primary={`Alice : ${Math.round(res.users.Alice * 100) / 100} €`}
              />
            </ListItem>
            <ListItem key={"Pierre"}>
              <ListItemText
                primary={`Pierre : ${
                  Math.round(res.users.Pierre * 100) / 100
                } €`}
              />
            </ListItem>
          </List>
        </Paper>
        <Paper>
          <h3>
            {
              appcopy["title.subsection_balancepercategory"][
                config.app.language
              ]
            }
          </h3>
          <List dense={true}>
            {Object.keys(res.categories).map((value) => (
              <ListItem
                key={`${res.categories[value]._id}`}
                id={`${res.categories[value]._id}`}
              >
                <ListItemText
                  sx={{ width: 2 / 7, textAlign: "right", mr: 2 }}
                  primary={`${res.categories[value].total} €`}
                />
                <ListItemText
                  sx={{ width: 5 / 7 }}
                  primary={`${res.categories[value].name}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>,
      document.getElementById("balance_summary")
    );
  });
}
async function openTransaction(id) {
  // Hide
  document.getElementById("balance_summary").style.display = "none";
  document.getElementById("balance_transactions").style.display = "none";
  // Display
  document.getElementById("balance_transaction").style.display = "block";

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
  if (id !== "") {
    // Load
    getTransaction(id).then((res) => {
      selectedTransaction = res._id;
      openTransactionUpdate(res);
    });
  }

  async function openTransactionUpdate(transaction) {
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
    //document.getElementById("transaction_category").value =
    //  transaction.category;
    CategorySelectorSetValue(transaction.category);
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
  //transaction.category = document.getElementById("transaction_category").value;
  transaction.category = CategorySelectorGetValue();
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
    //console.log(transaction);
    if (transaction._id === "") {
      // POST
      console.log("POST");
      //console.log(transaction);
      createTransaction(transaction).then(updateBalance());
    } else {
      // PUT
      console.log("PUT");
      //console.log(transaction);
      modifyTransaction(transaction._id, transaction).then(updateBalance());
    }
  }
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
