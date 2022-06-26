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
  Tab,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import appcopy from "../copy";
import Transaction from "./Transaction";
import Category from "./Category";
import { apiGetBalance, apiGetTransactions } from "../api/gets";
import Snack from "./Snack";

let emptySummary = { users: { Alice: 0, Pierre: 0 }, categories: [] };

export default class Balance extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance language = " + this.props.language);
    }
    this.state = {
      selectedTab: 0,
      tabHeight: 300,
      transactionid: "",
      transactionOpen: false,
      summary: emptySummary,
      transactions: [],
      transactionCategoryOpen: false,
      openSnack: false,
      snack: undefined
    };
    // Updates
    this.updateTabHeight = this.updateTabHeight.bind(this);
    this.updateSummary = this.updateSummary.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleOpenTransaction = this.handleOpenTransaction.bind(this);
    this.handleCloseTransaction = this.handleCloseTransaction.bind(this);
    this.handleOpenCategory = this.handleOpenCategory.bind(this);
    this.handleCloseCategory = this.handleCloseCategory.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.render");
    }
    return (
      <div>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => this.props.callback("openMenu")}
            >
              <MoreVertIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              {appcopy["mybalance"]["title"][this.props.language]}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Balance.AddIcon.onClick");
                }
                this.handleOpenTransaction("");
              }}
              sx={{ m: 1 }}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleChangeTab}
              variant="fullWidth"
            >
              <Tab
                label={
                  appcopy["mybalance"]["subsection"]["summary"][
                    this.props.language
                  ]
                }
                id="tab-0"
                aria-controls="tabpanel-0"
              />
              <Tab
                label={
                  appcopy["mybalance"]["subsection"]["transactions"][
                    this.props.language
                  ]
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
            <Typography variant="h6">
              {
                appcopy["mybalance"]["subsection"]["balanceperuser"][
                  this.props.language
                ]
              }
            </Typography>
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
            <Typography variant="h6">
              {
                appcopy["mybalance"]["subsection"]["balancepercategory"][
                  this.props.language
                ]
              }
            </Typography>
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
            <Button onClick={this.handleOpenCategory}>
              {
                appcopy["mybalance"]["specific"]["newcategory"][
                  this.props.language
                ]
              }
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
                        if (process.env.REACT_APP_DEBUG === "TRUE") {
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
        <Transaction
          transactionid={this.state.transactionid}
          open={this.state.transactionOpen}
          onclose={this.handleCloseTransaction}
          onedit={() => {
            this.updateTransactions();
            this.updateSummary();
          }}
          balanceSnack={this.handleSnack}
          language={this.props.language}
        />
        <Category
          open={this.state.transactionCategoryOpen}
          onclose={this.handleCloseCategory}
          onedit={this.updateSummary}
          balanceSnack={this.handleSnack}
          language={this.props.language}
        />

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
          language={this.props.language}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.componentDidMount");
    }
    // Update
    this.updateTabHeight();
    this.updateSummary();
  }

  // Updates
  updateTabHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.updateTabHeight");
    }
    this.setState({
      tabHeight: window.innerHeight - 180
    });
  }
  updateSummary() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.updateSummary");
    }
    apiGetBalance({ need: "summary" }).then((res) => {
      if (res.status === 200) {
        this.setState({
          summary: res.summary
        });
      } else {
        this.setState((prevState, props) => ({
          summary: emptySummary,
          openSnack: true,
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
    });
  }
  updateTransactions() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.updateTransactions");
    }
    //
    Moment.locale("en");
    apiGetTransactions({
      need: "mybalance"
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          transactions: res.transactions
        });
      } else {
        this.setState((prevState, props) => ({
          transactions: [],
          openSnack: [],
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
    });
  }

  // Handlers
  handleChangeTab(event, newTabIndex) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
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
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match tab index : " + newTabIndex);
        }
    }
    this.setState({
      selectedTab: newTabIndex
    });
  }
  handleOpenTransaction(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleOpenTransaction " + id);
    }
    this.setState({
      transactionid: id,
      transactionOpen: true
    });
  }
  handleCloseTransaction() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleCloseTransaction");
    }
    this.setState({
      transactionid: "",
      transactionOpen: false
    });
  }
  handleSaveTransaction() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleSaveTransaction");
    }
    this.updateBalance();
  }
  handleOpenCategory() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleOpenCategory");
    }
    this.setState({
      transactionCategoryOpen: true
    });
  }
  handleCloseCategory() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleCloseCategory");
    }
    this.setState({
      transactionCategoryOpen: false
    });
  }
  handleSaveCategory() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleSaveCategory");
    }
    this.updateBalance();
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleSnack " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false
        }));
        break;
      default:
    }
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
