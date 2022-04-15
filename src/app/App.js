import React from "react";
import ReactDOM from "react-dom";

import config from "../config";
import appcopy from "./copy";

import Balance from "./balance/Balance";

import Navbar from "./Navbar";
import navigation from "./navigation";
import { Divider } from "@material-ui/core";
import { Box } from "@mui/material";

import myrecipies from "./myrecipies";
import recipeview from "./recipeview";
import recipeedit from "./recipeedit";
import thisweek from "./thisweek";
import myfridge from "./myfridge";
import shopping from "./shopping";
/*import Menu from "./menu";
import Snackbar from "./Snackbar";
import myingredients from "./myingredients";*/

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: "thisweek" };
  }
  render() {
    return (
      <React.Fragment>
        {navigation.pages.map((page) => (
          <div id={`${page.code}`} />
        ))}
        <Navbar />
      </React.Fragment>
    );
  }
  componentDidMount() {
    // Render sub components
    ReactDOM.render(<Balance />, document.getElementById("mybalance"));
    myrecipies.render();
    /*
    myingredients.render();

    myingredients.update();*/

    // Update sub component content
    myrecipies.update();
    recipeview.render();
    recipeedit.render();
    thisweek.render();
    myfridge.render();
    shopping.render();

    // Resize
    document.getElementById("mybalance").style = "height: 200px;";
    // Navigate to landing page
    navigation.navigates("thisweek");
  }
}
