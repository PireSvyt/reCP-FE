import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import config from "../config";
import appcopy from "./copy";
import {
  getSelectedRecipes,
  renewRecipeSelection,
  addRecipeToSelection,
  removeRecipeFromSelection
} from "./api/thisweek";
import { recipeview_updateRecipe } from "./Recipeview";
import { navigates } from "./navigation";

export default class Thisweek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: ""
    };
  }

  render() {
    return (
      <div>
        <h2>{appcopy["title.section_thisweek"][config.app.language]}</h2>
        <div>
          <Button variant="text" onClick={renewSelection}>
            {appcopy["button.renew"][config.app.language]}
          </Button>
          <Button variant="text" onClick={addRecipe}>
            {appcopy["button.add"][config.app.language]}
          </Button>
        </div>
        <Paper>
          <div id="thisweek_recipelist" />
        </Paper>
        <Paper>
          <h3>
            {appcopy["title.subsection_ingredients"][config.app.language]}
          </h3>
          <div id="thisweek_ingredientlist" />
        </Paper>
      </div>
    );
  }
  componentDidMount() {
    updateThisweek();
  }
}

export function updateThisweek() {
  console.log("updateThisweek");
  getSelectedRecipes().then((res) => {
    console.log("updateThisweek getSelectedRecipes :");
    console.log(res);
    // Recipies
    const container = document.getElementById("thisweek_recipelist");
    ReactDOM.render(
      <List>
        {res.map((value) => (
          <ListItem key={`${value._id}`} id={`${value._id}`}>
            <ListItemButton
              onClick={() => {
                recipeview_updateRecipe(value._id);
                navigates("recipeview");
              }}
            >
              <ListItemText
                primary={`${value.name}`}
                secondary={`${value.scale} portions`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>,
      container
    );
    // Ingredients
    console.log("THIS WEEK UPDATED");
  });
}

function renewSelection() {
  renewRecipeSelection().then(() => updateThisweek());
}
function addRecipe() {
  addRecipeToSelection().then(() => updateThisweek());
}
function removeRecipe(item) {
  removeRecipeFromSelection(item).then(() => updateThisweek());
}
/* TODO
 * feasible recipe
 * done recipe
 * done ingredients
 * ingredients compute
 */
