import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Paper, ButtonGroup, Button } from "@mui/material";

import myrecipies from "./myrecipies";

const pages = [
  {
    label: "Mes recettes",
    code: "myrecipies",
    navbar: true,
    updateOnNav: true
  },
  {
    label: "Préparer ma recette",
    code: "recipeview",
    navbar: false,
    updateOnNav: false
  },
  {
    label: "Editer ma recette",
    code: "recipeedit",
    navbar: false,
    updateOnNav: false
  },
  {
    label: "Cette semaine",
    code: "thisweek",
    navbar: true,
    updateOnNav: false
  },
  { label: "Mon frigo", code: "myfridge", navbar: true, updateOnNav: false },
  {
    label: "Mes courses",
    code: "myshopping",
    navbar: true,
    updateOnNav: false
  },
  {
    label: "Mes ingrédients",
    code: "myingredients",
    navbar: false,
    updateOnNav: false
  }
];
exports.pages = pages;

exports.render = () => {
  const container = document.getElementById("navbar");
  ReactDOM.render(
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <ButtonGroup variant="text" aria-label="text button group">
        {pages.map((page) => {
          if (page.navbar === true) {
            return (
              <Button
                size="small"
                onClick={() => {
                  console.log("Navbar click");
                  navigates(page.code);
                }}
              >{`${page.label}`}</Button>
            );
          } else {
            return "";
          }
        })}
      </ButtonGroup>
    </Paper>,
    container
  );
};

function navigates(gotopage) {
  console.log("navigates to " + gotopage);
  if (pages.updateOnNav) {
    switch (gotopage) {
      case "myrecipies":
        myrecipies.update();
        break;
      default:
        console.log("Info : update requested without match with " + gotopage);
    }
  }
  pages.forEach((page) => {
    if (gotopage === page.code) {
      document.getElementById(page.code).style.display = "block";
    } else {
      document.getElementById(page.code).style.display = "none";
    }
  });
}
exports.navigates = (page) => {
  navigates(page);
};
