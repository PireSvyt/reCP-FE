import * as React from "react";
import {
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import BookIcon from "@mui/icons-material/Book";
import EventIcon from "@mui/icons-material/Event";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import appcopy from "./copy";

// UIs
import AppMenu from "./components/AppMenu";
import Ingredient from "./components/Ingredient";
import Ingredients from "./components/Ingredients";
import Shelf from "./components/Shelf";
import Shelfs from "./components/Shelfs";
import Shop from "./components/Shop";
import Shops from "./components/Shops";
import Category from "./components/Category";
import Categories from "./components/Categories";
import Balance from "./components/Balance";
import Myrecipies from "./components/Myrecipies";
import Recipe from "./components/Recipe";
import Thisweek from "./components/Thisweek";
import Fridge from "./components/Fridge";
import Shopping from "./components/Shopping";
import Snack from "./components/Snack";

// APIs
import {
  apiGetIngredients,
  apiGetShelfs,
  apiGetShops,
  apiGetRecipies,
  apiGetCategories
} from "./api/gets";
import {
  apiSetRecipeSelect,
  apiSetThisweekEmpty,
  apiSetThisweekRecipeAdd,
  apiSetThisweekRenew,
  apiSetThisweekRecipeReplace,
  apiSetThisweekRecipeScale,
  apiSetThisweekRecipePrepare,
  apiSetThisweekNeeds,
  apiSetFridgeEmpty,
  apiSetFridgeHave,
  apiSetShoppingEmpty,
  apiSetShoppingTake,
  apiSetShoppingAddtofridge
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
      selectedTab: 1,
      snack: undefined,
      openSnack: null,
      menulist: [],
      openMenu: false,
      openIngredient: false,
      openIngredients: false,
      openCategory: false,
      openCategories: false,
      openShelf: false,
      openShelfs: false,
      openShop: false,
      openShops: false,
      openRecipe: false,
      ingredientid: undefined,
      shelfid: undefined,
      shopid: undefined,
      recipeid: undefined,
      categoryid: undefined,
      apiIngredients: [],
      apiShelfs: [],
      apiShops: [],
      apiCategories: [],
      apiMyrecipies: [],
      apiThisweekrecipies: [],
      apiThisweekingredients: []
      //api_Transactions: [],
      //api_TransactionCategories: [],
    };

    // APIs
    this.api = this.api.bind(this);

    // Handles
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    this.handleShelf = this.handleShelf.bind(this);
    this.handleShop = this.handleShop.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleRecipe = this.handleRecipe.bind(this);
    this.handleMyrecipies = this.handleMyrecipies.bind(this);
    this.handleThisweek = this.handleThisweek.bind(this);
    this.handleFridge = this.handleFridge.bind(this);
    this.handleShopping = this.handleShopping.bind(this);
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
          secondaryvalues={this.state.apiShelfs}
          callback={this.handleIngredient}
        />
        <Ingredients
          language={this.props.language}
          open={this.state.openIngredients}
          values={this.state.apiIngredients}
          secondaryvalues={this.state.apiShelfs}
          callback={this.handleIngredient}
        />

        <Shelf
          language={this.props.language}
          open={this.state.openShelf}
          values={this.state.shelfid}
          secondaryvalues={this.state.apiShops}
          callback={this.handleShelf}
        />
        <Shelfs
          language={this.props.language}
          open={this.state.openShelfs}
          values={this.state.apiShelfs}
          secondaryvalues={this.state.apiShops}
          callback={this.handleShelf}
        />

        <Shop
          language={this.props.language}
          open={this.state.openShop}
          values={this.state.shopid}
          callback={this.handleShop}
        />
        <Shops
          language={this.props.language}
          open={this.state.openShops}
          values={this.state.apiShops}
          callback={this.handleShop}
        />

        <Category
          language={this.props.language}
          open={this.state.openCategory}
          values={this.state.categoryid}
          callback={this.handleCategory}
        />
        <Categories
          language={this.props.language}
          open={this.state.openCategories}
          values={this.state.apiCategories}
          callback={this.handleCategory}
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
        <AppTabPanel value={this.state.selectedTab} index={3} key={"shopping"}>
          <Shopping
            language={this.props.language}
            values={this.state.apiThisweekingredients}
            secondaryvalues={this.state.apiIngredients}
            callback={this.handleShopping}
          />
        </AppTabPanel>
        <AppTabPanel value={this.state.selectedTab} index={4} key={"mybalance"}>
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
            <BottomNavigation
              value={this.state.selectedTab}
              onChange={this.handleChangeTab}
            >
              <BottomNavigationAction
                icon={<BookIcon />}
                sx={{ ml: "-1em", mr: "-1em" }}
                onClick={() => this.api("LoadMyrecipies")}
              />
              <BottomNavigationAction
                icon={<EventIcon />}
                sx={{ ml: "-1em", mr: "-1em" }}
                onClick={() => this.api("LoadThisweekrecipies")}
              />
              <BottomNavigationAction
                icon={<KitchenIcon />}
                sx={{ ml: "-1em", mr: "-1em" }}
                onClick={() => this.api("LoadThisweekingredients")}
              />
              <BottomNavigationAction
                icon={<ShoppingBagIcon />}
                sx={{ ml: "-1em", mr: "-1em" }}
                onClick={() => this.api("LoadThisweekingredients")}
              />
              <BottomNavigationAction
                icon={<BalanceIcon />}
                sx={{ ml: "-1em", mr: "-1em" }}
              />
            </BottomNavigation>
            {/**
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleChangeTab}
              variant="fullWidth"
              sx={{ ml: "-1em", mr: "-1em" }}
            >
              <Tab
                icon={<BookIcon />}
                id={"navtab-" + 0}
                aria-controls={"navtabpanel-" + 0}
                key={"myrecipies"}
                onClick={() => this.api("LoadMyrecipies")}
              />
              <Tab
                icon={<EventIcon />}
                id={"navtab-" + 1}
                aria-controls={"navtabpanel-" + 1}
                key={"thisweek"}
                onClick={() => this.api("LoadThisweekrecipies")}
              />
              <Tab
                icon={<KitchenIcon />}
                id={"navtab-" + 2}
                aria-controls={"navtabpanel-" + 2}
                key={"fridge"}
                onClick={() => this.api("LoadThisweekingredients")}
              />
              <Tab
                icon={<ShoppingBagIcon />}
                id={"navtab-" + 3}
                aria-controls={"navtabpanel-" + 3}
                key={"shopping"}
                onClick={() => this.api("LoadThisweekingredients")}
              />
              <Tab
                icon={<BalanceIcon />}
                id={"navtab-" + 4}
                aria-controls={"navtabpanel-" + 4}
                key={"mybalance"}
              />
            </Tabs> */}
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
          name: appcopy["ingredients"]["title"][this.props.language],
          callback: () => {
            this.handleIngredient("openList");
          }
        },
        {
          name: appcopy["shelfs"]["title"][this.props.language],
          callback: () => {
            this.handleShelf("openList");
          }
        },
        {
          name: appcopy["shops"]["title"][this.props.language],
          callback: () => {
            this.handleShop("openList");
          }
        } /*,
        {
          name: "CATEGORIES",
          callback: () => {
            this.handleCategory("openList");
          }
        }*/
      ]
    }));
    this.api("LoadIngredients");
    this.api("LoadShelfs");
    this.api("LoadShops");
    this.api("LoadCategories");
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
      case "LoadShelfs":
        apiGetShelfs({
          need: "shelfs"
        }).then((res) => {
          if (res.status === 200) {
            this.setState({
              apiShelfs: res.shelfs
            });
          } else {
            this.setState((prevState, props) => ({
              apiShelfs: [],
              openSnack: [],
              snack: appcopy["generic"]["snack"]["errornetwork"]
            }));
          }
        });
        break;
      case "LoadShops":
        apiGetShops({
          need: "shops"
        }).then((res) => {
          if (res.status === 200) {
            this.setState({
              apiShops: res.shops
            });
          } else {
            this.setState((prevState, props) => ({
              apiShops: [],
              openSnack: [],
              snack: appcopy["generic"]["snack"]["errornetwork"]
            }));
          }
        });
        break;
      case "LoadCategories":
        apiGetCategories({
          need: "categories"
        }).then((res) => {
          if (res.status === 200) {
            this.setState({
              apiCategories: res.categories
            });
          } else {
            this.setState((prevState, props) => ({
              apiCategories: [],
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
          //console.log("App.apiLoadThisweekingredients.res");
          //console.log(res);
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
      console.log("App.handleMenu " + action);
    }
    console.log("App.handleMenu " + action);
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
  handleShelf(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleShelf " + action);
    }
    console.log("App.handleShelf " + action);
    switch (action) {
      case "openItem":
        this.setState((prevState, props) => ({
          openShelf: true,
          shelfid: details.shelfid
        }));
        break;
      case "closeItem":
        this.setState((prevState, props) => ({
          openShelf: false
        }));
        break;
      case "openList":
        this.api("LoadShelfs");
        this.setState((prevState, props) => ({
          openShelfs: true
        }));
        break;
      case "closeList":
        this.setState((prevState, props) => ({
          openShelfs: false
        }));
        break;
      default:
    }
  }
  handleShop(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleShop " + action);
    }
    console.log("App.handleShop " + action);
    switch (action) {
      case "openItem":
        this.setState((prevState, props) => ({
          openShop: true,
          shopid: details.shopid
        }));
        break;
      case "closeItem":
        this.setState((prevState, props) => ({
          openShop: false
        }));
        break;
      case "openList":
        this.api("LoadShops");
        this.setState((prevState, props) => ({
          openShops: true
        }));
        break;
      case "closeList":
        this.setState((prevState, props) => ({
          openShops: false
        }));
        break;
      default:
    }
  }
  handleCategory(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleCategory " + action);
    }
    console.log("App.handleCategory " + action);
    switch (action) {
      case "openItem":
        this.setState((prevState, props) => ({
          openCategory: true,
          categoryid: details.categoryid
        }));
        break;
      case "closeItem":
        this.setState((prevState, props) => ({
          openCategory: false
        }));
        break;
      case "openList":
        this.api("LoadCategories");
        this.setState((prevState, props) => ({
          openCategories: true
        }));
        break;
      case "closeList":
        this.setState((prevState, props) => ({
          openCategories: false
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
    let tmpMyrecipies = [];
    let tmpThisweekrecipies = [];
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
      case "selectItem":
        // Local
        tmpMyrecipies = this.state.apiMyrecipies;
        tmpMyrecipies.map((recipe) => {
          if (recipe._id === details.recipeid) {
            if (recipe.selected === true) {
              recipe.selected = false;
            } else {
              recipe.selected = true;
            }
          }
          return recipe;
        });
        tmpThisweekrecipies = this.state.apiThisweekrecipies;
        for (var i = 0; i < tmpThisweekrecipies.length; i++) {
          if (tmpThisweekrecipies[i]._id === details.recipeid) {
            tmpThisweekrecipies.splice(i, 1);
            break;
          }
        }
        this.setState({
          apiThisweekrecipies: tmpThisweekrecipies,
          apiMyrecipies: tmpMyrecipies
        });
        // Distant
        apiSetRecipeSelect(details.recipeid);
        break;
      case "scaleItem":
        // Local
        tmpThisweekrecipies = this.state.apiThisweekrecipies;
        tmpThisweekrecipies.map((recipe) => {
          if (recipe._id === details.recipeid) {
            if (recipe.selected === true) {
              if (details.increment === "up") {
                recipe.scale += 1;
              }
              if (details.increment === "down") {
                recipe.scale -= 1;
              }
            }
          }
          return recipe;
        });
        this.setState({
          apiThisweekrecipies: tmpThisweekrecipies
        });
        // Distant
        apiSetThisweekRecipeScale(details.recipeid, details.increment);
        break;
      case "cookItem":
        // Local
        tmpThisweekrecipies = this.state.apiThisweekrecipies;
        tmpThisweekrecipies.map((recipe) => {
          if (recipe._id === details.recipeid) {
            if (recipe.cooked === true) {
              recipe.cooked = false;
            } else {
              recipe.cooked = true;
            }
          }
          return recipe;
        });
        this.setState({
          apiThisweekrecipies: tmpThisweekrecipies
        });
        // Distant
        apiSetThisweekRecipePrepare(details.recipeid);
        break;
      case "openIngredient":
        this.handleIngredient("openItem", details);
        break;
      case "loadMyrecipies":
        this.api("LoadMyrecipies");
        break;
      default:
    }
  }
  handleMyrecipies(action, details) {
    if (process.env.REACT_APP_DEBUG === "true") {
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
        this.handleRecipe("openItem", details);
        break;
      case "selectRecipe":
        this.handleRecipe("selectItem", details);
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
        // Local
        this.setState({
          apiThisweekrecipies: []
        });
        // Distant
        apiSetThisweekEmpty().then((res) => {
          switch (res.status) {
            case 200:
              /*this.setState({
                openSnack: true,
                snack: appcopy["thisweek"]["snack"]["selection emptied"]
              });*/
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
              /*this.setState({
                openSnack: true,
                snack: appcopy["thisweek"]["snack"]["recipe added"]
              });*/
              break;
            case 208:
              this.setState({
                openSnack: true,
                snack:
                  appcopy["thisweek"]["snack"][
                    "208 - no more unselected recipies"
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
        this.handleRecipe("selectItem", details);
        break;
      case "replace":
        apiSetThisweekRecipeReplace(details.recipeid).then(
          this.api("LoadThisweekrecipies")
        );
        break;
      case "scale":
        // Local
        this.handleRecipe("scaleItem", details);
        // Distant
        apiSetThisweekRecipeScale(details.recipeid, details.increment);
        break;
      case "cook":
        // Local
        this.handleRecipe("cookItem", details);
        // Distant
        apiSetThisweekRecipePrepare(details.recipeid);
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
    let tmpList = [];
    switch (action) {
      case "openMenu":
        this.handleMenu("open");
        break;
      case "empty":
        // Local
        tmpList = this.state.apiThisweekingredients;
        tmpList.map((item) => {
          item.available = 0;
          return item;
        });
        this.setState({
          apiThisweekingredients: tmpList
        });
        // Distant
        apiSetFridgeEmpty().then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                openSnack: true,
                snack: appcopy["fridge"]["snack"]["emptied"]
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
      case "have":
        // Local
        tmpList = this.state.apiThisweekingredients;
        let tmpITem = {};
        tmpList.map((item) => {
          if (item._id === details.ingredientid) {
            if (item.available === item.quantity) {
              item.available = 0;
            } else {
              item.available = item.quantity;
            }
            tmpITem = item;
          }
          return item;
        });
        this.setState({
          apiThisweekingredients: tmpList
        });
        // Distant
        apiSetFridgeHave(tmpITem);
        break;
      case "reload":
        this.api("LoadThisweekingredients");
        break;
      default:
    }
  }
  handleShopping(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleShopping " + action);
    }
    console.log("App.handleShopping " + action);
    let tmpList = [];
    switch (action) {
      case "openMenu":
        this.handleMenu("open");
        break;
      case "empty":
        // Local
        tmpList = this.state.apiThisweekingredients;
        tmpList.map((item) => {
          item.shopped = 0;
          return item;
        });
        this.setState({
          apiThisweekingredients: tmpList
        });
        // Distant
        apiSetShoppingEmpty().then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                openSnack: true,
                snack: appcopy["shopping"]["snack"]["emptied"]
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
      case "take":
        // Local
        tmpList = this.state.apiThisweekingredients;
        let tmpITem = {};
        tmpList.map((item) => {
          if (item._id === details.ingredientid) {
            if (item.shopped === item.quantity - (item.available || 0)) {
              item.shopped = 0;
            } else {
              item.shopped = item.quantity - (item.available || 0);
            }
            tmpITem = item;
          }
          return item;
        });
        this.setState({
          apiThisweekingredients: tmpList
        });
        // Distant
        apiSetShoppingTake(tmpITem);
        break;
      case "reload":
        this.api("LoadThisweekingredients");
        break;
      case "addingredient":
        console.log("App.handleShopping.addingredient TODO");
        break;
      case "addtofridge":
        // Local
        tmpList = this.state.apiThisweekingredients;
        tmpList.map((item) => {
          item.available = (item.available || 0) + (item.shopped || 0);
          return item;
        });
        this.setState({
          apiThisweekingredients: tmpList
        });
        // Distant
        apiSetShoppingAddtofridge();
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
