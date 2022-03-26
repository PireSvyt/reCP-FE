import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import recipeview from "./app/recipeview";
import myrecipies from "./app/myrecipies";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: "thisweek" };
  }
  render() {
    return (
      <React.Fragment>
        <div id="myrecipies" />
        <div id="recipieedit" />
        <div id="recipeview" />
        <div id="thisweek" />
        <div id="fridge" />
        <div id="shopping" />
        <div id="ingredients" />
      </React.Fragment>
    );
  }
  componentDidMount() {
    myrecipies.render();
    recipeview.render();
  }
}
