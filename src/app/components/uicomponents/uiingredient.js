import * as React from "react";
import {
  IconButton,
  Typography,
  Box,
  Card,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";

import { random_id } from "../toolkit";

export default class UIIngredient extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIIngredient.constructor " + this.props.ingredient._id);
    }
    // Utils
    this.getShelfName = this.getShelfName.bind(this);
    // Handlers
    this.handleTake = this.handleTake.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIIngredient.render " + this.props.ingredient._id);
    }
    switch (this.props.packaging) {
      case "ingredients":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography>{this.props.ingredient.name}</Typography>
            <IconButton
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log(
                    "Ingredients.ingredients.onClick " +
                      this.props.ingredient._id
                  );
                }
                this.props.callback("openItem", {
                  ingredientid: this.props.ingredient._id
                });
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        );
      case "fridge":
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
              <IconButton
                onClick={() => {
                  this.handleHave();
                }}
              >
                {this.props.ingredient.quantity <=
                  this.props.ingredient.available && <CheckBoxIcon />}
                {(this.props.ingredient.quantity >
                  this.props.ingredient.available ||
                  this.props.ingredient.available === undefined) && (
                  <CheckBoxOutlineBlankIcon />
                )}
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <IconButton
                onClick={() => {
                  this.handleIncrement("down");
                }}
                disabled={true}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ width: "8em", textAlign: "center" }}>
                {(Math.round(this.props.ingredient.available * 10) / 10 || 0) +
                  " / " +
                  Math.round(this.props.ingredient.quantity * 10) / 10 +
                  " " +
                  this.props.ingredient.unit}
              </Typography>
              <IconButton
                onClick={() => {
                  this.handleIncrement("up");
                }}
                disabled={true}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Card>
        );
      case "shopping":
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
      default:
        return (
          <Card sx={{ width: "100%", pl: "1em", pr: "1em" }}>
            <Typography>Something went wrong</Typography>
          </Card>
        );
    }
  }

  // Utils
  getShelfName(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIIngredient.getShelfName : " + id);
    }
    let selectedshelf = "";
    this.props.shelfs.forEach((shelf) => {
      if (id === shelf._id) {
        selectedshelf = shelf.name;
      }
    });
    //console.log("shelf");
    //console.log(shelf);
    return selectedshelf;
  }

  // Handles
  handleTake() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIIngredient.handleTake " + this.props.ingredient._id);
    }
    this.props.callback("take", { ingredientid: this.props.ingredient._id });
  }
  handleHave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIIngredient.handleHave " + this.props.ingredient._id);
    }
    this.props.callback("have", { ingredientid: this.props.ingredient._id });
  }
  handleIncrement(newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(
        "UIIngredient.handleIncrement " +
          newValue +
          " " +
          this.props.ingredient._id
      );
    }
    this.props.callback("scale", {
      ingredientid: this.props.ingredient._id,
      incement: newValue
    });
  }
}
