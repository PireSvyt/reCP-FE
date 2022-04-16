import { createTheme } from "@mui/material/styles";
//import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008080"
    }
  },
  typography: {
    fontFamily: "Arial Narrow"
  }
});
console.log("theme:");
console.log(theme);

exports.theme = theme;
