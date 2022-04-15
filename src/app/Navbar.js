import * as React from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { navigates, pages } from "./navigation";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(3);
  //
  return (
    <Paper
      elevation={3}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {pages.map((page) => {
          if (page.navbar === true) {
            return (
              <BottomNavigationAction
                id={`${page.code}`}
                key={`${page.code}`}
                icon={<page.icon />}
                onClick={() => {
                  //console.log("Navbar clicked " + page.label);
                  navigates(page.code);
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </BottomNavigation>
    </Paper>
  );
}
