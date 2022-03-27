import React from "react";
import ReactDOM from "react-dom";

import myrecipies from "./myrecipies";

const pages = [
  {
    label: "Mes recettes",
    code: "myrecipies",
    appbar: true,
    updateOnNav: true
  },
  {
    label: "Préparer ma recette",
    code: "recipeview",
    appbar: false,
    updateOnNav: false
  },
  {
    label: "Editer ma recette",
    code: "recipeedit",
    appbar: false,
    updateOnNav: false
  },
  {
    label: "Cette semaine",
    code: "thisweek",
    appbar: true,
    updateOnNav: false
  },
  { label: "Mon frigo", code: "fridge", appbar: true, updateOnNav: false },
  { label: "Mes courses", code: "shopping", appbar: true, updateOnNav: false },
  {
    label: "Mes ingrédients",
    code: "myingredients",
    appbar: false,
    updateOnNav: false
  }
];
exports.pages = pages;

exports.navigates = (page) => {
  if (pages.updateOnNav) {
    switch (page) {
      case "myrecipies":
        myrecipies.update();
        break;
      default:
        console.log("Info : update requested without match with " + page);
    }
  }
  const container = document.getElementById(page);
  container.scrollIntoView();
};
