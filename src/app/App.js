import * as React from "react";
import { Paper, Box, Tabs, Tab } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import BookIcon from "@mui/icons-material/Book";

import appcopy from "./copy";

// UIs
import AppMenu from "./components/AppMenu";
import Ingredient from "./components/Ingredient";
import Ingredients from "./components/Ingredients";
import Balance from "./components/Balance";
import Myrecipies from "./components/Myrecipies";
import Recipe from "./components/Recipe";
import Snack from "./components/Snack";

// APIs
import { apiGetIngredients, apiGetRecipies } from "./api/gets";

export default class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App language = " + this.props.language);
    }
    this.state = {
      selectedTab: 0,
      snack: undefined,
      openSnack: null,
      openIngredient: false,
      openIngredients: false,
      openRecipe: false,
      menulist: [],
      ingredientid: undefined,
      apiIngredients: [],
      apiMyrecipies: []
      //api_Transactions: [],
      //api_TransactionCategories: [],
    };
    // Updates

    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleOpenIngredient = this.handleOpenIngredient.bind(this);
    this.handleCloseIngredient = this.handleCloseIngredient.bind(this);
    this.handleOpenIngredients = this.handleOpenIngredients.bind(this);
    this.handleCloseIngredients = this.handleCloseIngredients.bind(this);
    this.handleOpenRecipe = this.handleOpenRecipe.bind(this);
    this.handleCloseRecipe = this.handleCloseRecipe.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);

    // APIs
    this.apiLoadIngredients = this.apiLoadIngredients.bind(this);
    this.apiLoadMyrecipies = this.apiLoadMyrecipies.bind(this);
  }
  render() {
    return (
      <Box sx={{ width: "100%" }}>
        <AppMenu
          language={this.props.language}
          menulist={this.state.menulist}
        />

        <Ingredient
          language={this.props.language}
          open={this.state.openIngredient}
          ingredientid={this.state.ingredientid}
          onclose={this.handleCloseIngredient}
          onedit={this.apiAppendIngredients}
        />
        <Ingredients
          language={this.props.language}
          open={this.state.openIngredients}
          onclose={this.handleCloseIngredients}
          values={this.state.apiIngredients}
          openingredient={this.handleOpenIngredient}
        />

        <Recipe
          language={this.props.language}
          open={this.state.openRecipe}
          recipeid={this.state.recipeid}
          onclose={this.handleCloseRecipe}
          onedit={this.apiLoadMyrecipies}
          addingredient={this.handleOpenIngredient}
        />

        <AppTabPanel
          value={this.state.selectedTab}
          index={0}
          key={"myrecipies"}
        >
          <Myrecipies
            language={this.props.language}
            values={this.state.apiMyrecipies}
            refreshvalues={this.apiLoadMyrecipies}
            openrecipe={this.handleOpenRecipe}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={1} key={"mybalance"}>
          <Balance language={this.props.language} />
        </AppTabPanel>
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
              <Tab
                icon={<BookIcon />}
                id={"navtab-" + 0}
                aria-controls={"navtabpanel-" + 0}
                key={"myrecipies"}
              />
              <Tab
                icon={<BalanceIcon />}
                id={"navtab-" + 1}
                aria-controls={"navtabpanel-" + 1}
                key={"mybalance"}
              />
            </Tabs>
          </Box>
        </Paper>

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          onclose={this.handleCloseSnack}
          language={this.props.language}
        />
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.componentDidMount");
    }
    // Update
    this.setState((prevState, props) => ({
      menulist: [{ name: "INGREDIENTS", callback: this.handleOpenIngredients }]
    }));
    this.apiLoadIngredients();
    this.apiLoadMyrecipies();
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
  handleOpenIngredient(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleOpenIngredient " + id);
    }
    this.setState((prevState, props) => ({
      openIngredient: true,
      ingredientid: id
    }));
  }
  handleCloseIngredient() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleCloseIngredient");
    }
    this.setState((prevState, props) => ({
      openIngredient: false
    }));
  }
  handleOpenIngredients() {
    this.apiLoadIngredients();
    this.setState((prevState, props) => ({
      openIngredients: true
    }));
  }
  handleCloseIngredients() {
    this.setState((prevState, props) => ({
      openIngredients: false
    }));
  }
  handleOpenRecipe(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleOpenRecipe " + id);
    }
    this.setState((prevState, props) => ({
      openRecipe: true,
      recipeid: id
    }));
  }
  handleCloseRecipe() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleCloseRecipe");
    }
    this.setState((prevState, props) => ({
      openRecipe: false
    }));
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      openSnack: false
    }));
  }

  // APIs
  apiLoadIngredients() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.apiLoadIngredients");
    }
    apiGetIngredients({
      need: "ingredients"
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          apiIngredients: res.ingredients
        });
      } else {
        this.setState((prevState, props) => ({
          apiIngredients: [],
          openSnack: [],
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
    });
  }
  apiAppendIngredients(newIngredient) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.apiAppendIngredients");
    }
    var previousIngredients = this.state.apiIngredients;
    previousIngredients.push(newIngredient);
    this.setState((prevState, props) => ({
      apiIngredients: previousIngredients
    }));
  }
  apiLoadMyrecipies() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.apiLoadMyrecipies");
    }
    apiGetRecipies({
      need: "myrecipies"
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          apiMyrecipies: res.recipies
        });
      } else {
        this.setState((prevState, props) => ({
          apiMyrecipies: [],
          openSnack: true,
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
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
