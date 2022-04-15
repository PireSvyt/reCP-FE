import BalanceIcon from "@mui/icons-material/Balance";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import KitchenIcon from "@mui/icons-material/Kitchen";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookIcon from "@mui/icons-material/Book";

import config from "../config";
import appcopy from "./copy";

export const pages = [
  {
    label: appcopy["title.section_myrecipies"][config.app.language],
    code: "myrecipies",
    navbar: true,
    updateOnNav: true,
    icon: BookIcon
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
    updateOnNav: false,
    icon: CalendarTodayIcon
  },
  {
    label: appcopy["title.section_myfridge"][config.app.language],
    code: "myfridge",
    navbar: true,
    updateOnNav: false,
    icon: KitchenIcon
  },
  {
    label: appcopy["title.section_myshopping"][config.app.language],
    code: "myshopping",
    navbar: true,
    updateOnNav: false,
    icon: LocalGroceryStoreIcon
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
    updateOnNav: false,
    icon: BalanceIcon
  }
];

export function navigates(gotopage) {
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
