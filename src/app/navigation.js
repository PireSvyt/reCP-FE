//import myrecipies from "./myrecipies";

import config from "../config";
import appcopy from "./copy";

const pages = [
  {
    label: appcopy["title.section_myrecipies"][config.app.language],
    code: "myrecipies",
    navbar: true,
    updateOnNav: true
  },
  {
    label: appcopy["title.section_recipeview"][config.app.language],
    code: "recipeview",
    navbar: false,
    updateOnNav: false
  },
  {
    label: appcopy["title.section_recipeview"][config.app.language],
    code: "recipeedit",
    navbar: false,
    updateOnNav: false
  },
  {
    label: appcopy["title.section_thisweek"][config.app.language],
    code: "thisweek",
    navbar: true,
    updateOnNav: false
  },
  {
    label: appcopy["title.section_myfridge"][config.app.language],
    code: "myfridge",
    navbar: true,
    updateOnNav: false
  },
  {
    label: appcopy["title.section_myshopping"][config.app.language],
    code: "myshopping",
    navbar: true,
    updateOnNav: false
  },
  {
    code: "myingredients",
    navbar: false,
    updateOnNav: false
  },
  {
    label: appcopy["title.section_mybalance"][config.app.language],
    code: "mybalance",
    navbar: true,
    updateOnNav: false
  }
];
exports.pages = pages;

function navigates(gotopage) {
  //console.log("navigates to " + gotopage);
  if (pages.updateOnNav) {
    switch (gotopage) {
      //case "myrecipies":
      //myrecipies.update();
      //break;
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
