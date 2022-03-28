import React from "react";
import ReactDOM from "react-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import Navbar from "./Navbar";

import Menu from "./menu";
import navigation from "./navigation";
import recipeview from "./recipeview";
import recipeedit from "./recipeedit";
import myrecipies from "./myrecipies";
import thisweek from "./thisweek";
import myfridge from "./myfridge";
import shopping from "./shopping";
import myingredients from "./myingredients";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: "thisweek" };
  }
  render() {
    return (
      <React.Fragment>
        <div id="menu" />
        <div id="menu_placeholder" />
        {navigation.pages.map((page) => (
          <div id={`${page.code}`} />
        ))}
        <div id="navbar" />
        <div id="navbar_placeholder" />
      </React.Fragment>
    );
  }
  componentDidMount() {
    function dummy_navbar() {
      return (
        <Paper sx={{ bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation showLabels value={0}>
            <BottomNavigationAction label="dummy navbar" />
          </BottomNavigation>
        </Paper>
      );
    }

    // Render sub components
    ReactDOM.render(<Menu />, document.getElementById("menu"));

    ReactDOM.render(<Navbar />, document.getElementById("navbar"));
    ReactDOM.render(
      dummy_navbar(),
      document.getElementById("navbar_placeholder")
    );

    myrecipies.render();
    myingredients.render();
    recipeview.render();
    recipeedit.render();
    thisweek.render();
    myfridge.render();
    shopping.render();

    // Update sub component content
    myrecipies.update();
    myingredients.update();

    // Navigate to landing page
    navigation.navigates("thisweek");
  }
}
