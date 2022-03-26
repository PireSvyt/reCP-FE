import { StrictMode } from "react";
import ReactDOM from "react-dom";

import recipies from "./api/recipies";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

const myrecipies = recipies.getRecipes();
console.log(myrecipies);
