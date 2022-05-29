import * as React from "react";
import { Paper, Box, Tabs, Tab } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import BookIcon from "@mui/icons-material/Book";

import appcopy from "./copy";

import Balance from "./balance/Balance";
import Myrecipies from "./Myrecipies";

const pages = [
  {
    index: 0,
    label: appcopy["myrecipies"]["title"][process.env.REACT_APP_LANGUAGE],
    code: "myrecipies",
    icon: BookIcon,
    component: Myrecipies
  },
  {
    index: 1,
    label: appcopy["mybalance"]["title"][process.env.REACT_APP_LANGUAGE],
    code: "mybalance",
    icon: BalanceIcon,
    component: Balance
  }
];

export default class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    this.state = {
      selectedTab: 0
    };
    // Updates

    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }
  render() {
    return (
      <Box sx={{ width: "100%" }}>
        {pages.map((page) => (
          <AppTabPanel
            value={this.state.selectedTab}
            index={page.index}
            key={page.code}
          >
            <page.component />
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
              {pages.map((page) => (
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
