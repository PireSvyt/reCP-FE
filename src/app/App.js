import * as React from "react";
import { Paper, Box, Tabs, Tab } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import BookIcon from "@mui/icons-material/Book";

import appcopy from "./copy";

import AppMenu from "./AppMenu";
import Ingredients from "./Ingredients";
import Balance from "./balance/Balance";
import Myrecipies from "./Myrecipies";
import { TrafficRounded } from "@mui/icons-material";

export default class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App language = " + this.props.language);
    }
    this.state = {
      selectedTab: 0,
      openIngredients: false,
      menulist: [],
      pages: [
        {
          index: 0,
          label: appcopy["myrecipies"]["title"][this.props.language],
          code: "myrecipies",
          icon: BookIcon,
          component: Myrecipies
        },
        {
          index: 1,
          label: appcopy["mybalance"]["title"][this.props.language],
          code: "mybalance",
          icon: BalanceIcon,
          component: Balance
        }
      ]
    };
    // Updates

    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleOpenIngredients = this.handleOpenIngredients.bind(this);
    this.handleCloseIngredients = this.handleCloseIngredients.bind(this);
  }
  render() {
    return (
      <Box sx={{ width: "100%" }}>
        <AppMenu
          language={this.props.language}
          menulist={this.state.menulist}
        />
        <Ingredients
          language={this.props.language}
          open={this.state.openIngredients}
          onclose={this.handleCloseIngredients}
        />
        {this.state.pages.map((page) => (
          <AppTabPanel
            value={this.state.selectedTab}
            index={page.index}
            key={page.code}
          >
            <page.component language={this.props.language} />
          </AppTabPanel>
        ))}
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleChangeTab}
              variant="fullWidth"
            >
              {this.state.pages.map((page) => (
                <Tab
                  icon={<page.icon />}
                  id={"navtab-" + page.index}
                  aria-controls={"navtabpanel-" + page.index}
                  key={page.code}
                />
              ))}
            </Tabs>
          </Box>
        </Paper>
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.componentDidMount");
    }
    // Update
    this.setState((prevState, props) => ({
      menulist: [{ name: "INGREDIENTS", callback: this.handleOpenIngredients }]
    }));
  }

  // Handlers
  handleChangeTab(event, newTabIndex) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleChangeTab " + newTabIndex);
    }
    switch (newTabIndex) {
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match tab index : " + newTabIndex);
        }
    }
    this.setState({
      selectedTab: newTabIndex
    });
  }
  handleOpenIngredients() {
    this.setState((prevState, props) => ({
      openIngredients: true
    }));
  }
  handleCloseIngredients() {
    this.setState((prevState, props) => ({
      openIngredients: false
    }));
  }
}

function AppTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={"navtabpanel-" + index}
      aria-labelledby={"navtab-" + index}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}
