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
import { getSelectedRecipes } from "./api/thisweek";
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
  getSelectedRecipes().then((res) => {
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
  });
}

function renewSelection() {
  console.log("TODO RENEW SELECTION");
}
function addRecipe(item) {
  console.log("TODO ADD RECIPE");
}
function removeRecipe(item) {
  console.log("TODO REMOVE RECIPE");
}
function renewRecipe(item) {
  console.log("TODO RENEW RECIPE");
}
/* TODO
 * feasible recipe
 * done recipe
 * done ingredients
 * ingredients compute
 */
