import * as React from "react";
import { Paper, Box, Tabs, Tab } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import BookIcon from "@mui/icons-material/Book";
import EventIcon from "@mui/icons-material/Event";
import KitchenIcon from "@mui/icons-material/Kitchen";

import appcopy from "./copy";

// UIs
import AppMenu from "./components/AppMenu";
import Ingredient from "./components/Ingredient";
import Ingredients from "./components/Ingredients";
import Balance from "./components/Balance";
import Myrecipies from "./components/Myrecipies";
import Recipe from "./components/Recipe";
import Thisweek from "./components/Thisweek";
import Fridge from "./components/Fridge";
import Snack from "./components/Snack";

// APIs
import { apiGetIngredients, apiGetRecipies } from "./api/gets";
import {
  apiSetThisweekEmpty,
  apiSetThisweekRecipeAdd,
  apiSetThisweekRenew,
  apiSetThisweekRecipeReplace,
  apiSetThisweekRecipeRemove,
  apiSetThisweekRecipeScale,
  apiSetThisweekRecipePrepare,
  apiSetThisweekNeeds,
  apiSetFridgeEmpty,
  apiSetFridgeHave,
  apiSetFridgeHavent
} from "./api/sets";

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
      openMenu: false,
      openIngredient: false,
      openIngredients: false,
      openRecipe: false,
      menulist: [],
      ingredientid: undefined,
      apiIngredients: [],
      apiMyrecipies: [],
      apiThisweekrecipies: [],
      apiThisweekingredients: []
      //api_Transactions: [],
      //api_TransactionCategories: [],
    };
    // Updates

    // APIs
    this.api = this.api.bind(this);

    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    this.handleRecipe = this.handleRecipe.bind(this);
    this.handleMyrecipies = this.handleMyrecipies.bind(this);
    this.handleThisweek = this.handleThisweek.bind(this);
    this.handleFridge = this.handleFridge.bind(this);
    this.handleBalance = this.handleBalance.bind(this);
  }
  render() {
    return (
      <Box>
        <AppMenu
          language={this.props.language}
          open={this.state.openMenu}
          values={this.state.menulist}
          callback={this.handleMenu}
        />

        <Ingredient
          language={this.props.language}
          open={this.state.openIngredient}
          values={this.state.ingredientid}
          callback={this.handleIngredient}
        />
        <Ingredients
          language={this.props.language}
          open={this.state.openIngredients}
          values={this.state.apiIngredients}
          callback={this.handleIngredient}
        />

        <Recipe
          language={this.props.language}
          open={this.state.openRecipe}
          values={this.state.recipeid}
          callback={this.handleRecipe}
        />

        <AppTabPanel
          value={this.state.selectedTab}
          index={0}
          key={"myrecipies"}
        >
          <Myrecipies
            language={this.props.language}
            values={this.state.apiMyrecipies}
            callback={this.handleMyrecipies}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={1} key={"thisweek"}>
          <Thisweek
            language={this.props.language}
            values={this.state.apiThisweekrecipies}
            callback={this.handleThisweek}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={2} key={"fridge"}>
          <Fridge
            language={this.props.language}
            values={this.state.apiThisweekingredients}
            callback={this.handleFridge}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={3} key={"mybalance"}>
          <Balance
            language={this.props.language}
            callback={this.handleBalance}
          />
        </AppTabPanel>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Box>
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
                icon={<EventIcon />}
                id={"navtab-" + 1}
                aria-controls={"navtabpanel-" + 1}
                key={"thisweek"}
              />
              <Tab
                icon={<KitchenIcon />}
                id={"navtab-" + 2}
                aria-controls={"navtabpanel-" + 2}
                key={"fridge"}
              />
              <Tab
                icon={<BalanceIcon />}
                id={"navtab-" + 3}
                aria-controls={"navtabpanel-" + 3}
                key={"mybalance"}
              />
            </Tabs>
          </Box>
        </Paper>

        <Snack
          language={this.props.language}
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
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
      menulist: [
        {
          name: "INGREDIENTS",
          callback: () => {
            this.handleIngredient("openList");
          }
        }
      ]
    }));
    this.api("LoadIngredients");
    this.api("LoadMyrecipies");
    this.api("LoadThisweekrecipies");
    this.api("LoadThisweekingredients");
  }

  // API
  api(source, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.api " + source);
    }
    console.log("App.api " + source);
    switch (source) {
      case "LoadIngredients":
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
        break;
      case "AppendIngredients":
        var previousIngredients = this.state.apiIngredients;
        previousIngredients.push(details.newIngredient);
        this.setState((prevState, props) => ({
          apiIngredients: previousIngredients
        }));
        break;
      case "LoadMyrecipies":
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
        break;
      case "LoadThisweekrecipies":
        apiGetRecipies({
          need: "thisweek"
        }).then((res) => {
          if (res.status === 200) {
            this.setState({
              apiThisweekrecipies: res.recipies
            });
          } else {
            this.setState((prevState, props) => ({
              apiThisweekrecipies: [],
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errornetwork"]
            }));
          }
        });
        break;
      case "LoadThisweekingredients":
        apiSetThisweekNeeds().then((res) => {
          console.log("App.apiLoadThisweekingredients.res");
          console.log(res);
          //apiGetIngredients({
          //  need: "fridge"
          //}).then((res) => {
          if (res.status === 200) {
            this.setState({
              apiThisweekingredients: res.ingredients
            });
          } else {
            this.setState((prevState, props) => ({
              apiThisweekingredients: [],
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errornetwork"]
            }));
          }
        });
        break;
      default:
    }
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
  handleMenu(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleManu " + action);
    }
    console.log("App.handleManu " + action);
    switch (action) {
      case "open":
        this.setState((prevState, props) => ({
          openMenu: true
        }));
        break;
      case "close":
        this.setState((prevState, props) => ({
          openMenu: false
        }));
        break;
      default:
    }
  }
  handleIngredient(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleIngredient " + action);
    }
    console.log("App.handleIngredient " + action);
    switch (action) {
      case "openItem":
        this.setState((prevState, props) => ({
          openIngredient: true,
          ingredientid: details.ingredientid
        }));
        break;
      case "closeItem":
        this.setState((prevState, props) => ({
          openIngredient: false
        }));
        break;
      case "openList":
        this.api("LoadIngredients");
        this.setState((prevState, props) => ({
          openIngredients: true
        }));
        break;
      case "closeList":
        this.setState((prevState, props) => ({
          openIngredients: false
        }));
        break;
      default:
    }
  }
  handleRecipe(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleRecipe " + action);
    }
    console.log("App.handleRecipe " + action);
    switch (action) {
      case "openItem":
        this.setState((prevState, props) => ({
          openRecipe: true,
          recipeid: details.recipeid
        }));
        break;
      case "closeItem":
        this.setState((prevState, props) => ({
          openRecipe: false
        }));
        break;
      case "openIngredient":
        this.handleIngredient("openItem", details.ingredientid);
        break;
      case "loadMyrecipies":
        this.api("LoadMyrecipies");
        break;
      default:
    }
  }
  handleMyrecipies(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleMyrecipies " + action);
    }
    console.log("App.handleMyrecipies " + action);
    switch (action) {
      case "openMenu":
        this.handleMenu("open");
        break;
      case "reload":
        this.api("LoadMyrecipies");
        break;
      case "openRecipe":
        this.handleRecipe("open", details.recipeid);
        break;
      case "selectRecipe":
        // TODO
        break;
      default:
    }
  }
  handleThisweek(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleThisweek " + action);
    }
    console.log("App.handleThisweek " + action);
    switch (action) {
      case "openMenu":
        this.handleMenu("open");
        break;
      case "empty":
        apiSetThisweekEmpty().then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                apiThisweekrecipies: []
              });
              this.setState({
                openSnack: true,
                snack: appcopy["thisweek"]["snack"]["selection emptied"]
              });
              break;
            case 400:
              this.setState({
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              });
              break;
            default:
              this.setState((prevState, props) => ({
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
          }
        });
        break;
      case "renew":
        apiSetThisweekRenew().then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                apiThisweekrecipies: res.recipies
              });
              this.setState({
                openSnack: true,
                snack: appcopy["thisweek"]["snack"]["selection renewed"]
              });
              break;
            case 304:
              this.setState({
                openSnack: true,
                snack:
                  appcopy["thisweek"]["snack"][
                    "304 - no more unselected recipies"
                  ]
              });
              break;
            case 400:
              this.setState({
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              });
              break;
            default:
              this.setState((prevState, props) => ({
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
          }
        });
        break;
      case "add":
        apiSetThisweekRecipeAdd().then((res) => {
          switch (res.status) {
            case 200:
              let currentSelection = this.state.apiThisweekrecipies;
              currentSelection.push(res.recipe);
              this.setState({
                apiThisweekrecipies: currentSelection
              });
              this.setState({
                openSnack: true,
                snack: appcopy["thisweek"]["snack"]["recipe added"]
              });
              break;
            case 304:
              this.setState({
                openSnack: true,
                snack:
                  appcopy["thisweek"]["snack"][
                    "304 - no more unselected recipies"
                  ]
              });
              break;
            case 400:
              this.setState({
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              });
              break;
            default:
              this.setState((prevState, props) => ({
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
          }
        });
        break;
      case "remove":
        apiSetThisweekRecipeRemove(details.recipeid).then(
          this.api("LoadThisweekrecipies")
        );
        break;
      case "replace":
        apiSetThisweekRecipeReplace(details.recipeid).then(
          this.api("LoadThisweekrecipies")
        );
        break;
      case "scale":
        apiSetThisweekRecipeScale(details.recipeid, details.increment).then(
          this.api("LoadThisweekrecipies")
        );
        break;
      case "cook":
        apiSetThisweekRecipePrepare(details.recipeid).then(
          this.api("LoadThisweekrecipies")
        );
        break;
      case "reload":
        this.api("LoadThisweekrecipies");
        break;
      default:
    }
  }
  handleFridge(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleFridge " + action);
    }
    console.log("App.handleFridge " + action);
    switch (action) {
      case "openMenu":
        this.handleMenu("open");
        break;
      case "empty":
        console.log("App.handleFridgeEmpty TODO");
        break;
      case "have":
        apiSetFridgeHave(details.ingredientid).then(
          this.api("LoadThisweekingredients")
        );
        break;
      case "havent":
        apiSetFridgeHavent(details.ingredientid).then(
          this.api("LoadThisweekingredients")
        );
        break;
      case "reload":
        this.api("LoadThisweekingredients");
        break;
      default:
    }
  }
  handleBalance(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleBalance " + action);
    }
    console.log("App.handleBalance " + action);
    switch (action) {
      case "openMenu":
        this.handleMenu("open");
        break;
      default:
    }
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleSnack " + action);
    }
    console.log("App.handleSnack " + action);
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false
        }));
        break;
      default:
    }
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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
