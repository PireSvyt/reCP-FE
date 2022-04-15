import React from "react";
import ReactDOM from "react-dom";

//import Navbar from "./Navbar";
import Balance from "./balance/Balance";

/*import Menu from "./menu";
import Snackbar from "./Snackbar";
import navigation from "./navigation";
import recipeview from "./recipeview";
import recipeedit from "./recipeedit";
import myrecipies from "./myrecipies";
import thisweek from "./thisweek";
import myfridge from "./myfridge";
import shopping from "./shopping";
import myingredients from "./myingredients";*/

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: "thisweek" };
  }
  render() {
    return (
      <div>
        <Balance />
      </div>
    );
  }
  componentDidMount() {
    /*
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
    navigation.navigates("thisweek");*/
  }
}
