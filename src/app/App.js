import React from "react";

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
        {navigation.pages.map((page) => (
          <div id={`${page.code}`} />
        ))}
        <div id="navbar" />
      </React.Fragment>
    );
  }
  componentDidMount() {
    // Render sub components
    myrecipies.render();
    myingredients.render();
    recipeview.render();
    recipeedit.render();
    thisweek.render();
    myfridge.render();
    shopping.render();
    navigation.render();
    // Update sub component content
    myrecipies.update();
    myingredients.update();
    // Navigate to landing page
    navigation.navigates("thisweek");
  }
}
