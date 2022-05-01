import * as React from "react";
import ReactDOM from "react-dom";
import Moment from "moment";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Swipeable from "react-mui-swipeable";

import config from "../../config";
import appcopy from "./copy";
import { getTransactions } from "./api/transactions";
import getBalance from "./api/balance";
import Transaction from "./Transaction";

let debug = false;

export default class Balance extends React.Component {
  constructor(props) {
    if (debug) {
      console.log("Balance.constructor");
    }
    super(props);
    this.state = {
      transactionID: "",
      transactionOpen: false
    };
    this.handleOpenTransaction = this.handleOpenTransaction.bind(this);
    this.handleCloseTransaction = this.handleCloseTransaction.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
  }
  render() {
    if (debug) {
      console.log("Balance.render");
    }
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
          <Button
            variant="contained"
            id="balance_updatesummary"
            onClick={this.updateBalance}
          >
            {appcopy["title.section_mybalance"][config.app.language]}
          </Button>
          <Fab
            color="primary"
            sx={{ position: "fixed", right: 20, bottom: 80 }}
          >
            <AddIcon
              onClick={() => {
                if (debug) {
                  console.log("Balance.AddIcon.onClick");
                }
                this.handleOpenTransaction("");
              }}
            />
          </Fab>
        </Box>
        <Transaction
          transactionID={this.state.transactionID}
          transactionOpen={this.state.transactionOpen}
          onsave={this.handleSaveTransaction}
          onclose={this.handleCloseTransaction}
        />
        <div id="balance_summary"></div>
        <div id="balance_transactions"></div>
        <div id="balance_snackbar_div"></div>
      </div>
    );
  }
  componentDidMount() {
    if (debug) {
      console.log("Balance.componentDidMount");
    }
    // Hide
    document.getElementById("balance_transactions").style.display = "none";
    // Update
    this.updateBalance();
  }
  updateTransactions() {
    if (debug) {
      console.log("Balance.updateTransactions");
    }
    // Hide
    document.getElementById("balance_summary").style.display = "none";
    // Display
    document.getElementById("balance_transactions").style.display = "block";
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
                      this.handleOpenTransaction(value._id);
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
  updateBalance() {
    if (debug) {
      console.log("Balance.updateBalance");
    }
    // Hide
    //document.getElementById("balance_transaction").style.display = "none";
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
                  primary={`Alice : ${
                    Math.round(res.users.Alice * 100) / 100
                  } €`}
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
                    primary={`${
                      Math.round(res.categories[value].total * 100) / 100
                    } €`}
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
  handleOpenTransaction(id) {
    if (debug) {
      console.log("Balance.handleOpenTransaction " + id);
    }
    this.setState({
      transactionID: id,
      transactionOpen: true
    });
  }
  handleCloseTransaction() {
    if (debug) {
      console.log("Balance.handleCloseTransaction");
    }
    this.setState({
      transactionID: "",
      transactionOpen: false
    });
  }
  handleSaveTransaction() {
    if (debug) {
      console.log("Balance.handleSaveTransaction");
    }
    this.updateBalance();
  }
}
