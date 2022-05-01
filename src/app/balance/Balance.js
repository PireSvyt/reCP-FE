import * as React from "react";
import Moment from "moment";
import {
  Paper,
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

let debug = false;

export default class Balance extends React.Component {
  constructor(props) {
    if (debug) {
      console.log("Balance.constructor");
    }
    super(props);
    this.state = {
      selectedTab: 0,
      tabHeight: 300,
      transactionID: "",
      transactionOpen: false,
      summary: { users: { Alice: 0, Pierre: 0 }, categories: [] },
      transactions: []
    };
    this.updateTabHeight = this.updateTabHeight.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleOpenTransaction = this.handleOpenTransaction.bind(this);
    this.handleCloseTransaction = this.handleCloseTransaction.bind(this);
    this.updateSummary = this.updateSummary.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
  }
  render() {
    if (debug) {
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
            <Paper>
              <h3>
                {
                  appcopy["title.subsection_balanceperuser"][
                    config.app.language
                  ]
                }
              </h3>
              <List>
                <ListItem key={"Alice"}>
                  <ListItemText
                    primary={`Alice : ${
                      Math.round(this.state.summary.users.Alice * 100) / 100
                    } €`}
                  />
                </ListItem>
                <ListItem key={"Pierre"}>
                  <ListItemText
                    primary={`Pierre : ${
                      Math.round(this.state.summary.users.Pierre * 100) / 100
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
            </Paper>
          </TabPanel>
          <TabPanel
            value={this.state.selectedTab}
            index={1}
            style={{ maxHeight: this.state.tabHeight, overflow: "auto" }}
          >
            <Paper>
              <h3>
                {appcopy["title.subsection_transactions"][config.app.language]}
              </h3>
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
                          if (debug) {
                            console.log(
                              "updateTransactions.onClick " + value._id
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
            </Paper>
          </TabPanel>
        </Box>
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            top: 85,
            left: window.innerWidth / 2 - 20
          }}
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
        <Transaction
          transactionID={this.state.transactionID}
          transactionOpen={this.state.transactionOpen}
          onsave={() => {} /*this.handleSaveTransaction*/}
          onclose={this.handleCloseTransaction}
        />
      </div>
    );
  }
  componentDidMount() {
    if (debug) {
      console.log("Balance.componentDidMount");
    }
    // Update
    this.updateSummary();
    this.updateTabHeight();
  }
  handleChangeTab(event, newTabIndex) {
    if (debug) {
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
        if (debug) {
          console.log("/!\\ no match tab index : " + newTabIndex);
        }
    }
    this.setState({
      selectedTab: newTabIndex
    });
  }
  updateTabHeight() {
    if (debug) {
      console.log("Balance.updateTabHeight");
    }
    this.setState({
      tabHeight: window.innerHeight - 180
    });
  }
  updateSummary() {
    if (debug) {
      console.log("Balance.updateSummary");
    }
    getBalance().then((res) => {
      this.setState({
        summary: res
      });
    });
  }
  updateTransactions() {
    if (debug) {
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
