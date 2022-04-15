import React from "react";
import ReactDOM from "react-dom";

import Balance from "./balance/Balance";

import Navbar from "./Navbar";
import navigation from "./navigation";
import Myrecipies from "./Myrecipies";
import Recipeview from "./Recipeview";
import Recipeedit from "./Recipeedit";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: "thisweek" };
  }
  render() {
    return (
      <React.Fragment>
        {navigation.pages.map((page) => (
          <div id={`${page.code}`} key={`${page.code}`} />
        ))}
        <Navbar />
      </React.Fragment>
    );
  }
  componentDidMount() {
    // Render sub components
    ReactDOM.render(<Balance />, document.getElementById("mybalance"));
    ReactDOM.render(<Myrecipies />, document.getElementById("myrecipies"));
    ReactDOM.render(<Recipeview />, document.getElementById("recipeview"));
    ReactDOM.render(<Recipeedit />, document.getElementById("recipeedit"));
    // Navigate to landing page
    navigation.navigates("thisweek");
  }
}
