import * as React from "react";
import ReactDOM from "react-dom";
import Moment from "moment";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  TextField,
  ListItemButton
} from "@mui/material";

import config from "../../../config/config";
import appcopy from "../Appcopy";
import { snack } from "../App";

//import basicdatepicker from "./basicdatepicker";

import transactionsAPI from "./api/transactions";
import balanceAPI from "./api/balance";

export default class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: "summary", transaction: "" };
  }
  render() {
    function handleChange(event) {
      console.log("handleChange event :");
      console.log(event);
    }

    console.log(config);
    return (
      <React.Fragment>
        <div>
          <h2>{appcopy["title.section_mybalance"][config.app.language]}</h2>
          <div>
            <Button variant="text" id="balance_newtransaction">
              {appcopy["button.add"][config.app.language]}
            </Button>
            <Button variant="text" id="balance_updatesummary">
              {appcopy["button.renew"][config.app.language]}
            </Button>
            <Button variant="text" id="balance_updatetransactions">
              {appcopy["button.transactions"][config.app.language]}
            </Button>
          </div>
          <div id="balance_summary"></div>
          <div id="balance_stats"></div>
          <div id="balance_transaction">
            <Paper>
              <h3>
                {appcopy["title.subsection_transaction"][config.app.language]}
              </h3>
              <Button id="balance_savetransaction" variant="text">
                {appcopy["button.save"][config.app.language]}
              </Button>
              <TextField
                id="transaction_name"
                label={appcopy["input.name"][config.app.language]}
                variant="standard"
                onChange={handleChange()}
              />
              <TextField
                id="transaction_date"
                label={appcopy["input.date"][config.app.language]}
                variant="standard"
                onChange={handleChange()}
              />
              <TextField
                id="transaction_amount"
                label={appcopy["input.amount"][config.app.language]}
                variant="standard"
                onChange={handleChange()}
              />
              <h4>{appcopy["text.by"][config.app.language]}</h4>
              <RadioGroup row>
                <FormControlLabel
                  id="transaction_by_Alice"
                  value="Alice"
                  name="transaction_by"
                  control={<Radio />}
                  label="Alice"
                />
                <FormControlLabel
                  id="transaction_by_Pierre"
                  value="Pierre"
                  name="transaction_by"
                  control={<Radio />}
                  label="Pierre"
                />
              </RadioGroup>
              <h4>{appcopy["text.for"][config.app.language]}</h4>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Alice"
                      defaultChecked={true}
                      name="transaction_for"
                      id="transaction_for_Alice"
                    />
                  }
                  label="Alice"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Pierre"
                      defaultChecked={true}
                      name="transaction_for"
                      id="transaction_for_Pierre"
                    />
                  }
                  label="Pierre"
                />
              </FormGroup>
              <TextField
                id="transaction_category"
                label={appcopy["input.category"][config.app.language]}
                variant="standard"
                onChange={handleChange()}
              />
            </Paper>
          </div>
          <div id="balance_transactions"></div>
        </div>
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
      console.log("Balance click : Nouvelle transaction");
      openTransaction("");
    };
    document.getElementById("balance_updatesummary").onclick = function () {
      console.log("Balance click : Mise à jour summary");
      updateBalance();
    };
    document.getElementById("balance_savetransaction").onclick = function () {
      console.log("Balance click : Sauver");
      saveTransaction();
    };
    document.getElementById(
      "balance_updatetransactions"
    ).onclick = function () {
      console.log("Balance click : Mise à jour transactions");
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
  balanceAPI.getBalance().then((res) => {
    ReactDOM.render(
      <div>
        <Paper>
          <h3>{appcopy["title.subsection_balance"][config.app.language]}</h3>
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
  // Hide
  document.getElementById("balance_summary").style.display = "none";
  document.getElementById("balance_stats").style.display = "none";
  document.getElementById("balance_transactions").style.display = "none";
  // Display
  document.getElementById("balance_transaction").style.display = "block";
  // Load
  function openTransactionUpdate(transaction) {
    document.getElementById("transaction_name").value = transaction.name;
    //document.getElementById("transaction_date").value = transaction.date;
    document.getElementById("transaction_amount").value = transaction.amount;

    if (transaction.by === "Alice") {
      document.getElementById("transaction_by_Alice").checked = true;
    } else {
      document.getElementById("transaction_by_Alice").checked = false;
    }
    if (transaction.by === "Pierre") {
      document.getElementById("transaction_by_Pierre").checked = true;
    } else {
      document.getElementById("transaction_by_Pierre").checked = false;
    }

    if (transaction.for.includes("Alice")) {
      document.getElementById("transaction_for_Alice").checked = true;
    } else {
      document.getElementById("transaction_for_Alice").checked = false;
    }
    if (transaction.for.includes("Pierre")) {
      document.getElementById("transaction_for_Pierre").checked = true;
    } else {
      document.getElementById("transaction_for_Pierre").checked = false;
    }

    document.getElementById("transaction_category").value =
      transaction.category;
  }
  if (id !== "") {
    transactionsAPI.getTransaction(id).then((res) => {
      openTransactionUpdate(res);
    });
  } else {
    openTransactionUpdate({
      name: "",
      date: Date(),
      amount: 0,
      by: "",
      for: ["Alice", "Pierre"],
      category: ""
    });
  }
}
function saveTransaction() {
  // Retrieve inputs
  var transaction = {
    name: "",
    date: null,
    amount: null,
    by: "",
    for: [],
    category: ""
  };
  transaction.name = document.getElementById("transaction_name").value;
  console.log(document.getElementById("transaction_date"));
  //transaction.date = document.getElementById("transaction_date").value;
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
  // Save or not?
  console.log("Save TRANSACTION ? : " + save);
  console.log(transaction);
  console.log(errors);
}

function updateTransactions() {
  // List items
  function transactionListItem(value) {
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
  transactionsAPI.getTransactions().then((res) => {
    const container = document.getElementById("balance_transactions");
    ReactDOM.render(
      <List>{res.map((value) => transactionListItem(value))}</List>,
      container
    );
  });
}
