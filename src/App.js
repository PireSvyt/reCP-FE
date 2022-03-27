import React from "react";
import "./styles.css";

import navigation from "./app/navigation";
import recipeview from "./app/recipeview";
import recipeedit from "./app/recipeedit";
import myrecipies from "./app/myrecipies";
import myingredients from "./app/myingredients";

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
      </React.Fragment>
    );
  }
  componentDidMount() {
    myrecipies.render();
    myingredients.render();
    recipeview.render();
    recipeedit.render();
    myrecipies.update();
    myingredients.update();
  }
}
