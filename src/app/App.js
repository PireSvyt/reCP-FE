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

    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleOpenIngredient = this.handleOpenIngredient.bind(this);
    this.handleCloseIngredient = this.handleCloseIngredient.bind(this);
    this.handleOpenIngredients = this.handleOpenIngredients.bind(this);
    this.handleCloseIngredients = this.handleCloseIngredients.bind(this);
    this.handleOpenRecipe = this.handleOpenRecipe.bind(this);
    this.handleCloseRecipe = this.handleCloseRecipe.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    this.handleThisweekEmpty = this.handleThisweekEmpty.bind(this);
    this.handleThisweekRenew = this.handleThisweekRenew.bind(this);
    this.handleThisweekRecipeAdd = this.handleThisweekRecipeAdd.bind(this);
    this.handleThisweekRecipeRemove = this.handleThisweekRecipeRemove.bind(
      this
    );
    this.handleThisweekRecipeReplace = this.handleThisweekRecipeReplace.bind(
      this
    );
    this.handleThisweekRecipeScale = this.handleThisweekRecipeScale.bind(this);
    this.handleThisweekRecipeCook = this.handleThisweekRecipeCook.bind(this);
    this.handleFridgeEmpty = this.handleFridgeEmpty.bind(this);
    this.handleFridgeHave = this.handleFridgeHave.bind(this);
    this.handleFridgeHavent = this.handleFridgeHavent.bind(this);

    // APIs
    this.apiLoadIngredients = this.apiLoadIngredients.bind(this);
    this.apiLoadMyrecipies = this.apiLoadMyrecipies.bind(this);
    this.apiAppendIngredients = this.apiAppendIngredients.bind(this);
    this.apiLoadThisweekrecipies = this.apiLoadThisweekrecipies.bind(this);
    this.apiLoadThisweekingredients = this.apiLoadThisweekingredients.bind(
      this
    );
  }
  render() {
    return (
      <Box>
        <AppMenu
          language={this.props.language}
          open={this.state.openMenu}
          onclose={this.handleCloseMenu}
          menulist={this.state.menulist}
        />

        <Ingredient
          language={this.props.language}
          open={this.state.openIngredient}
          ingredientid={this.state.ingredientid}
          onclose={this.handleCloseIngredient}
          onedit={() => {
            /*this.apiAppendIngredients*/
          }}
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
            openmenu={this.handleOpenMenu}
            values={this.state.apiMyrecipies}
            refreshvalues={this.apiLoadMyrecipies}
            openrecipe={this.handleOpenRecipe}
            reloadvalues={this.apiLoadMyrecipies}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={1} key={"thisweek"}>
          <Thisweek
            language={this.props.language}
            openmenu={this.handleOpenMenu}
            values={this.state.apiThisweekrecipies}
            onempty={this.handleThisweekEmpty}
            onadd={this.handleThisweekRecipeAdd}
            onrenew={this.handleThisweekRenew}
            onremove={this.handleThisweekRecipeRemove}
            onreplace={this.handleThisweekRecipeReplace}
            onscale={this.handleThisweekRecipeScale}
            oncook={this.handleThisweekRecipeCook}
            reloadvalues={this.apiLoadThisweekrecipies}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={2} key={"fridge"}>
          <Fridge
            language={this.props.language}
            openmenu={this.handleOpenMenu}
            values={this.state.apiThisweekingredients}
            onreset={this.handleFridgeEmpty}
            onhave={this.handleFridgeHave}
            onhavent={this.handleFridgeHavent}
            reloadvalues={this.apiLoadThisweekingredients}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={3} key={"mybalance"}>
          <Balance
            language={this.props.language}
            openmenu={this.handleOpenMenu}
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
    this.apiLoadThisweekrecipies();
    this.apiLoadThisweekingredients();
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
  // Menu
  handleOpenMenu() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleOpenMenu");
    }
    this.setState((prevState, props) => ({
      openMenu: true
    }));
  }
  handleCloseMenu() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleCloseMenu");
    }
    this.setState((prevState, props) => ({
      openMenu: false
    }));
  }
  // Ingredients
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
  // Recipe
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
  // This week
  handleThisweekEmpty() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleThisweekEmpty");
    }
    console.log("App.handleThisweekEmpty");
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
  }
  handleThisweekRenew() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleThisweekRenew");
    }
    console.log("App.handleThisweekRenew");
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
              appcopy["thisweek"]["snack"]["304 - no more unselected recipies"]
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
  }
  handleThisweekRecipeAdd() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleThisweekRecipeAdd");
    }
    console.log("App.handleThisweekRecipeAdd");
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
              appcopy["thisweek"]["snack"]["304 - no more unselected recipies"]
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
  }
  handleThisweekRecipeRemove(recipeid) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleThisweekRecipeRemove " + recipeid);
    }
    console.log("App.handleThisweekRecipeRemove " + recipeid);
    apiSetThisweekRecipeRemove(recipeid).then(this.apiLoadThisweekrecipies());
  }
  handleThisweekRecipeReplace(recipeid) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleThisweekRecipeReplace " + recipeid);
    }
    console.log("App.handleThisweekRecipeReplace " + recipeid);
    apiSetThisweekRecipeReplace(recipeid).then(this.apiLoadThisweekrecipies());
  }
  handleThisweekRecipeScale(recipeid, increment) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(
        "App.handleThisweekRecipeScale " + increment + " " + recipeid
      );
    }
    console.log("App.handleThisweekRecipeScale " + increment + " " + recipeid);
    apiSetThisweekRecipeScale(recipeid, increment).then(
      this.apiLoadThisweekrecipies()
    );
  }
  handleFridgeHave(recipeid) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleFridgeHave " + recipeid);
    }
    console.log("App.handleFridgeHave " + recipeid);
    apiSetFridgeHave(recipeid).then(this.apiLoadThisweekingredients());
  }
  handleFridgeHavent(recipeid) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleFridgeHavent " + recipeid);
    }
    console.log("App.handleFridgeHavent " + recipeid);
    apiSetFridgeHavent(recipeid).then(this.apiLoadThisweekingredients());
  }
  handleThisweekRecipeCook(recipeid) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleThisweekRecipeCook " + recipeid);
    }
    console.log("App.handleThisweekRecipeCook " + recipeid);
    apiSetThisweekRecipePrepare(recipeid).then(this.apiLoadThisweekrecipies());
  }
  handleFridgeEmpty() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleFridgeEmpty ");
    }
    console.log("App.handleFridgeEmpty TODO");
  }
  // Snack
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
  apiLoadThisweekrecipies() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.apiLoadThisweekrecipies");
    }
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
  }
  apiLoadThisweekingredients() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.apiLoadThisweekingredients");
    }
    console.log("App.apiLoadThisweekingredients");
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
