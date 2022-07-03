import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Fab,
  TextField,
  Box,
  DialogContentText,
  Card,
  CardContent,
  CardActions,
  Autocomplete
} from "@mui/material";
import {TreeView,
  TreeItem} from '@mui/lab';
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
//import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TuneIcon from "@mui/icons-material/Tune";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import appcopy from "../copy";
import Snack from "./Snack";

export default class Shopping extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping language = " + this.props.language);
    }
    this.state = {
      recipiesHeight: 300,
      listView: "block",
      addingIngredient: "none",
      treeCategories: {}
    };
    // Updates
    this.updateShoppingHeight = this.updateShoppingHeight.bind(this);
    this.getTreeCategories = this.getTreeCategories.bind(this);
    // Handles
    this.handleSnack = this.handleSnack.bind(this);
    this.handleEmpty = this.handleEmpty.bind(this);
    this.handleTake = this.handleTake.bind(this);
    this.handleAddtofridge = this.handleAddtofridge.bind(this);
    this.handleEnableAdd = this.handleEnableAdd.bind(this);
    this.handleListView = this.handleListView.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.render");
    }
    return (
      <Box>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => this.props.callback("openMenu")}
            >
              <MoreVertIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {appcopy["shopping"]["title"][this.props.language]}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Shopping.ListIcon.onClick");
                }
                this.handleListView();
              }}
              sx={{ mr: "0.25em", display: "none" }}
            >
              <FormatListBulletedIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Shopping.EmptyIcon.onClick");
                }
                this.handleEmpty();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box style={{ maxHeight: this.state.recipiesHeight, overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Typography sx={{ ml: 2 }} variant="h6" component="div">
              {
                appcopy["shopping"]["subsection"]["ihavent"][
                  this.props.language
                ]
              }
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2, display: "none" }}
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Shopping.AddIcon.onClick");
                }
                this.handleEnableAdd();
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box>
            <ShoppingAddIngredient
              language={this.props.language}
              open={this.state.openIngredients}
              values={this.props.secondaryvalues}
              callback={this.handleIngredient}
              addingingredient={this.state.addingIngredient}
            />
            <List dense={true} sx={{ display: this.state.listView }}>
              {this.props.values.map((ingredient) => {
                if (
                  ingredient.quantity - (ingredient.available || 0) >
                  (ingredient.shopped || 0)
                ) {
                  return (
                    <ListItem key={"totake-" + ingredient._id}>
                      <ShoppingIngredient
                        ingredient={ingredient}
                        callback={this.props.callback}
                      />
                    </ListItem>
                  );
                } else {
                  return <div key={"totake-" + ingredient._id} />;
                }
              })}
            </List>
            <TreeView>
              {
                //https://mui.com/material-ui/react-tree-view/
                Object.keys(this.state.treeCategories).forEach((category) => {
                  console.log("category")
                  console.log(category)
                  return (
                    <TreeItem nodeId={category} label={category} >
                      {this.state.treeCategories[category].forEach((ingredient) => {
                        console.log("ingredient")
                        console.log(ingredient)
                        if (
                          ingredient.quantity - (ingredient.available || 0) >
                          (ingredient.shopped || 0)
                        ) {
                        console.log("to add")
                          return (
                            <ShoppingIngredient
                              ingredient={ingredient}
                              callback={this.props.callback}
                            />
                          );
                        } else {
                          console.log("dummy div")
                          return <div key={"totake-" + category + "-" + ingredient._id} />;
                        }
                      })}
                      ABC
                    </ TreeItem >
                  )
                })
              }
            </TreeView> 
          </Box>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {appcopy["shopping"]["subsection"]["ihave"][this.props.language]}
          </Typography>
          <Box>
            <List dense={true} sx={{ display: this.state.listView }}>
              {
                this.props.values.map((ingredient) => {
                  if (
                    ingredient.quantity - (ingredient.available || 0) <=
                      (ingredient.shopped || 0) &&
                    ingredient.quantity > (ingredient.available || 0)
                  ) {
                    return (
                      <ListItem key={"taken-" + ingredient._id}>
                        <ShoppingIngredient
                          ingredient={ingredient}
                          callback={this.props.callback}
                        />
                      </ListItem>
                    );
                  } else {
                    return <div key={"taken-" + ingredient._id} />;
                  }
                })
              }
            </List>
          </Box>
          <Button onClick={() => this.handleAddtofridge()}>
            {appcopy["shopping"]["button"]["addtofridge"][this.props.language]}
          </Button>

          <Snack
            snackOpen={this.state.snackOpen}
            snack={this.state.snack}
            callback={this.handleSnack}
            language={this.props.language}
          />
        </Box>
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.componentDidMount");
    }
    // Update
    this.updateShoppingHeight();
  }

  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.componentDidUpdate");
      //console.log("Shopping.state");
      //console.log(this.state);
    }
    if (prevState.values !== this.props.values) {
      this.getTreeCategories();
    }
  }
  getTreeCategories() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.getTreeCategories");
    }
    // useful
    function compare(a, b) {
      if (a.localeCompare(b, "en", { sensitivity: "base" }) === 1) {
        return 1;
      } else {
        return -1;
      }
    }
    // Populate
    let newCategories = {};
    this.props.values.forEach((ingredient) => {
      //console.log("ingredient");
      //console.log(ingredient);
      //console.log("ingredient.category = " + ingredient.category);
      if (ingredient.category === undefined) {
        if (Object.keys(newCategories).length === 0) {
          //console.log("default category (no key) ");
          newCategories["?"] = [];
          newCategories["?"].push(ingredient);
        } else {
          //console.log("default category ");
          newCategories["?"].push(ingredient);
        }
      } else {
        if (Object.keys(newCategories).length === 0) {
          //console.log("new category (no key) : " + ingredient.category);
          newCategories[ingredient.category] = [];
          newCategories[ingredient.category].push(ingredient);
        } else {
          //console.log("Object.keys(newCategories)");
          //console.log(Object.keys(newCategories));
          if (ingredient.category in Object.keys(newCategories)) {
            //console.log("append category : " + ingredient.category);
            newCategories[ingredient.category].push(ingredient);
          } else {
            //console.log("new category : " + ingredient.category);
            newCategories[ingredient.category] = [];
            newCategories[ingredient.category].push(ingredient);
          }
        }
      }
    });
    //console.log("newCategories");
    //console.log(newCategories);

    // Sort and update
    //newCategories.sort(compare);
    this.setState({
      treeCategories: newCategories
    });
  }

  // Updates
  updateShoppingHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.updateShoppingHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 130
    });
  }

  // Handles
  handleEmpty() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleEmpty ");
    }
    this.props.callback("empty");
  }
  handleTake(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleTake " + id);
    }
    this.props.callback("take", { ingredientid: id });
  }
  handleAddtofridge() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleAddtofridge ");
    }
    this.props.callback("addtofridge");
  }
  handleListView() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleListView");
    }
    switch (this.state.listView) {
      case "none":
        this.setState((prevState, props) => ({
          listView: "block"
        }));
        break;
      case "block":
        this.setState((prevState, props) => ({
          listView: "none"
        }));
        break;
      default:
        console.log("Shopping.handleListView unmatched " + this.state.listView);
        this.setState((prevState, props) => ({
          listView: "none"
        }));
    }
  }
  handleEnableAdd() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleEnableAdd");
    }
    switch (this.state.addingIngredient) {
      case "none":
        this.setState((prevState, props) => ({
          addingIngredient: "block"
        }));
        break;
      case "block":
        this.setState((prevState, props) => ({
          addingIngredient: "none"
        }));
        break;
      default:
        console.log(
          "Shopping.handleEnableAdd unmatched " + this.state.addingIngredient
        );
        this.setState((prevState, props) => ({
          addingIngredient: "none"
        }));
    }
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleSnack " + action);
    }
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

class ShoppingIngredient extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(
        "ShoppingIngredient.constructor " + this.props.ingredient._id
      );
    }
    // Handlers
    this.handleTake = this.handleTake.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingIngredient.render " + this.props.ingredient._id);
    }
    return (
      <Card sx={{ width: "100%", pl: "1em", pr: "1em" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography>{this.props.ingredient.name}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography sx={{ textAlign: "right", pr: "1em" }}>
              {Math.round(
                (this.props.ingredient.quantity -
                  (this.props.ingredient.available || 0)) *
                  10
              ) /
                10 +
                " " +
                this.props.ingredient.unit}
            </Typography>
            <IconButton
              onClick={() => {
                this.handleTake();
              }}
            >
              {this.props.ingredient.quantity -
                (this.props.ingredient.available || 0) <=
                (this.props.ingredient.shopped || 0) && <CheckBoxIcon />}
              {this.props.ingredient.quantity -
                (this.props.ingredient.available || 0) >
                (this.props.ingredient.shopped || 0) && (
                <CheckBoxOutlineBlankIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Card>
    );
  }

  // Handles
  handleTake() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingIngredient.handleTake " + this.props.ingredient._id);
    }
    this.props.callback("take", { ingredientid: this.props.ingredient._id });
  }
}

let emptyIngredient = {
  _id: undefined,
  name: undefined,
  shops: [],
  unit: undefined,
  category: undefined
};

class ShoppingAddIngredient extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingAddIngredient.constructor");
    }
    this.state = {
      ingredient: { ...emptyIngredient }
    };
    // Handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingAddIngredient.render " + this.state.ingredient._id);
    }
    return (
      <Card
        sx={{
          ml: "1em",
          mr: "1em",
          pl: "1em",
          pr: "1em",
          display: this.props.addingingredient
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Autocomplete
            sx={{
              width: "100%"
            }}
            disablePortal
            options={this.props.values}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label={appcopy["generic"]["input"]["name"][this.props.language]}
              />
            )}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            value={this.state.ingredient.name}
            onChange={(event, newValue) => {
              event.target = {
                name: "name",
                value: newValue
              };
              this.handleChange(event, newValue);
            }}
            getOptionLabel={(option) => {
              var shorlist = this.props.values.filter(function (
                value,
                index,
                arr
              ) {
                if (typeof option === "string") {
                  return value.name === option;
                } else {
                  return value.name === option.name;
                }
              });
              if (shorlist.length === 1) {
                return shorlist[0].name;
              } else {
                return "";
              }
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TextField
              name="quantity"
              label={
                appcopy["generic"]["input"]["quantity"][this.props.language]
              }
              variant="standard"
              value={this.state.ingredient.quantity}
              onChange={this.handleChange}
              autoComplete="off"
              type="number"
            />
            <TextField
              name="unit"
              label={appcopy["generic"]["input"]["unit"][this.props.language]}
              variant="standard"
              value={this.state.ingredient.unit || ""}
              onChange={this.handleChange}
              autoComplete="off"
              disabled={true}
            />
            <Button onClick={() => this.handleAddtofridge()}>
              {appcopy["generic"]["button"]["add"][this.props.language]}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        ></Box>
      </Card>
    );
  }

  // Handles
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingAddIngredient.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    console.log("this.state.ingredient");
    console.log(this.state.ingredient);
    var previousIngredient = this.state.ingredient;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        if (target.value === null) {
          previousIngredient.name = undefined;
          previousIngredient.unit = undefined;
        } else {
          console.log("change name : " + target.value.name);
          previousIngredient.name = target.value.name;
          previousIngredient.unit = target.value.unit;
        }
        break;
      case "quantity":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change quantity : " + target.value);
        }
        previousIngredient.quantity = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingAddIngredient.ingredient");
      console.log(this.state.ingredient);
    }
    console.log(this.state.ingredient);
    console.log(previousIngredient);
    this.setState((prevState, props) => ({
      ingredient: previousIngredient
    }));
  }
  handleAdd() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(
        "ShoppingAddIngredient.handleAdd " + this.props.ingredient._id
      );
    }
    this.props.callback("addingredient", {
      ingredientid: this.state.ingredient
    });
  }
}
