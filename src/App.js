import React from "react";

import navigation from "./app/navigation";
import recipeview from "./app/recipeview";
import recipeedit from "./app/recipeedit";
import myrecipies from "./app/myrecipies";
import thisweek from "./app/thisweek";
import myfridge from "./app/myfridge";
import shopping from "./app/shopping";
import myingredients from "./app/myingredients";

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
