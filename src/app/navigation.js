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

function navigates(gotopage) {
  //console.log("navigates to " + gotopage);
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
