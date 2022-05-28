import * as React from "react";
import Moment from "moment";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Fab,
  Tabs,
  Tab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import config from "../../config";
import appcopy from "./copy";
import { getTransactions } from "./api/transactions";
import getBalance from "./api/balance";
import Transaction from "./Transaction";
import TransactionCategory from "./TransactionCategory";
import Snack from "./Snack";

export default class Balance extends React.Component {
  constructor(props) {
    if (config.debug) {
      console.log("Balance.constructor");
    }
    super(props);
    this.state = {
      selectedTab: 0,
      tabHeight: 300,
      transactionID: "",
      transactionOpen: false,
      summary: { users: { Alice: 0, Pierre: 0 }, categories: [] },
      transactions: [],
      transactionCategoryOpen: false,
      snackOpen: false,
      snackSeverity: "warning",
      snackMessage: "Empty",
      snackDuration: 5000
    };
    // Updates
    this.updateTabHeight = this.updateTabHeight.bind(this);
    this.updateSummary = this.updateSummary.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleOpenTransaction = this.handleOpenTransaction.bind(this);
    this.handleCloseTransaction = this.handleCloseTransaction.bind(this);
    this.handleOpenTransactionCategory = this.handleOpenTransactionCategory.bind(
      this
    );
    this.handleCloseTransactionCategory = this.handleCloseTransactionCategory.bind(
      this
    );
    this.handleSaveTransactionCategory = this.handleSaveTransactionCategory.bind(
      this
    );
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
  }
  render() {
    if (config.debug) {
      console.log("Balance.render");
    }
    return (
      <div>
        <h2>{appcopy["title.section_mybalance"][config.app.language]}</h2>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleChangeTab}
              variant="fullWidth"
            >
              <Tab
                label={appcopy["title.subsection_balance"][config.app.language]}
                id="tab-0"
                aria-controls="tabpanel-0"
              />
              <Tab
                label={
                  appcopy["title.subsection_transactions"][config.app.language]
                }
                id="tab-1"
                aria-controls="tabpanel-1"
              />
            </Tabs>
          </Box>
          <TabPanel
            value={this.state.selectedTab}
            index={0}
            style={{ maxHeight: this.state.tabHeight, overflow: "auto" }}
          >
            <h3>
              {appcopy["title.subsection_balanceperuser"][config.app.language]}
            </h3>
            <List>
              <ListItem key={"Alice"}>
                <ListItemText
                  sx={{ width: 2 / 7, textAlign: "right", mr: 2 }}
                  primary={`${
                    Math.round(this.state.summary.users.Alice * 100) / 100
                  } €`}
                />
                <ListItemText sx={{ width: 5 / 7 }} primary={"Alice"} />
              </ListItem>
              <ListItem key={"Pierre"}>
                <ListItemText
                  sx={{ width: 2 / 7, textAlign: "right", mr: 2 }}
                  primary={`${
                    Math.round(this.state.summary.users.Pierre * 100) / 100
                  } €`}
                />
                <ListItemText sx={{ width: 5 / 7 }} primary={"Pierre"} />
              </ListItem>
            </List>
            <h3>
              {
                appcopy["title.subsection_balancepercategory"][
                  config.app.language
                ]
              }
            </h3>
            <List dense={true}>
              {Object.keys(this.state.summary.categories).map((value) => (
                <ListItem
                  key={`${this.state.summary.categories[value]._id}`}
                  id={`${this.state.summary.categories[value]._id}`}
                >
                  <ListItemText
                    sx={{ width: 2 / 7, textAlign: "right", mr: 2 }}
                    primary={`${
                      Math.round(
                        this.state.summary.categories[value].total * 100
                      ) / 100
                    } €`}
                  />
                  <ListItemText
                    sx={{ width: 5 / 7 }}
                    primary={`${this.state.summary.categories[value].name}`}
                  />
                </ListItem>
              ))}
            </List>
            <Button onClick={this.handleOpenTransactionCategory}>
              {appcopy["button.newTransactionCategory"][config.app.language]}
            </Button>
          </TabPanel>
          <TabPanel
            value={this.state.selectedTab}
            index={1}
            style={{ maxHeight: this.state.tabHeight, overflow: "auto" }}
          >
            <List dense={true}>
              {this.state.transactions.map((value) => (
                <ListItem key={`${value._id}`} id={`${value._id}`}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row"
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        if (config.debug) {
                          console.log(
                            "Balance.transactions.onClick " + value._id
                          );
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
          </TabPanel>
        </Box>
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            top: 40,
            left: window.innerWidth / 2 - 28
          }}
        >
          <AddIcon
            onClick={() => {
              if (config.debug) {
                console.log("Balance.AddIcon.onClick");
              }
              this.handleOpenTransaction("");
            }}
          />
        </Fab>
        <Transaction
          transactionID={this.state.transactionID}
          transactionOpen={this.state.transactionOpen}
          onclose={this.handleCloseTransaction}
          balanceSnack={this.handleSnack}
        />
        <TransactionCategory
          open={this.state.transactionCategoryOpen}
          onclose={this.handleCloseTransactionCategory}
          balanceSnack={this.handleSnack}
        />

        <Snack
          snackOpen={this.state.snackOpen}
          snackMessage={this.state.snackMessage}
          snackDuration={this.state.snackDuration}
          snackSeverity={this.state.snackSeverity}
          onclose={this.handleCloseSnack}
        />
      </div>
    );
  }
  componentDidMount() {
    if (config.debug) {
      //console.log("Balance.componentDidMount");
    }
    // Update
    this.updateTabHeight();
    this.updateSummary();
  }

  // Updates
  updateTabHeight() {
    if (config.debug) {
      console.log("Balance.updateTabHeight");
    }
    this.setState({
      tabHeight: window.innerHeight - 180
    });
  }
  updateSummary() {
    if (config.debug) {
      console.log("Balance.updateSummary");
    }
    getBalance().then((res) => {
      this.setState({
        summary: res
      });
    });
  }
  updateTransactions() {
    if (config.debug) {
      console.log("Balance.updateTransactions");
    }
    //
    Moment.locale("en");
    getTransactions().then((res) => {
      this.setState({
        transactions: res
      });
    });
  }

  // Handlers
  handleChangeTab(event, newTabIndex) {
    if (config.debug) {
      console.log("Balance.handleChangeTab " + newTabIndex);
    }
    switch (newTabIndex) {
      case 0:
        this.updateSummary();
        break;
      case 1:
        this.updateTransactions();
        break;
      default:
        if (config.debug) {
          console.log("/!\\ no match tab index : " + newTabIndex);
        }
    }
    this.setState({
      selectedTab: newTabIndex
    });
  }
  handleOpenTransaction(id) {
    if (config.debug) {
      console.log("Balance.handleOpenTransaction " + id);
    }
    this.setState({
      transactionID: id,
      transactionOpen: true
    });
  }
  handleCloseTransaction(snack) {
    if (config.debug) {
      console.log("Balance.handleCloseTransaction");
    }
    this.setState({
      transactionID: "",
      transactionOpen: false,
      snackOpen: true,
      snackSeverity: snack.severity,
      snackMessage: snack.message,
      snackDuration: snack.duration
    });
  }
  handleSaveTransaction() {
    if (config.debug) {
      console.log("Balance.handleSaveTransaction");
    }
    this.updateBalance();
  }
  handleOpenTransactionCategory() {
    if (config.debug) {
      console.log("Balance.handleOpenTransactionCategory");
    }
    this.setState({
      transactionCategoryOpen: true
    });
  }
  handleCloseTransactionCategory(snack) {
    if (config.debug) {
      console.log("Balance.handleCloseTransactionCategory");
    }
    this.setState({
      transactionCategoryOpen: false,
      snackOpen: true,
      snackSeverity: snack.severity,
      snackMessage: snack.message,
      snackDuration: snack.duration
    });
  }
  handleSaveTransactionCategory() {
    if (config.debug) {
      console.log("Balance.handleSaveTransactionCategory");
    }
    this.updateBalance();
  }
  handleCloseSnack() {
    if (config.debug) {
      console.log("Balance.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={"tabpanel-" + index}
      aria-labelledby={"tab-" + index}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}
