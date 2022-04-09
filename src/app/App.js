import React from "react";
import ReactDOM from "react-dom";

import Navbar from "./Navbar";
import Balance from "./balance/Balance";

import Menu from "./menu";
import Snackbar from "./Snackbar";
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
        <Menu />
        <div id="menu_placeholder" />
        {navigation.pages.map((page) => (
          <div id={`${page.code}`} key={page.code} />
        ))}
        <Navbar />
        <Snackbar />
      </React.Fragment>
    );
  }
  componentDidMount() {
    // Render sub components
    ReactDOM.render(<Balance />, document.getElementById("mybalance"));

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
