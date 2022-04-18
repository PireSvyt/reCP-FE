import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import config from "../../config";
import appcopy from "./copy";
import { getCategoryTransactions } from "./api/categorytransactions";

const filter = createFilterOptions();
var options = [];
var currentValue = "";

export function CategorySelector() {
  //const [value, setValue] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  return (
    <Autocomplete
      value={currentValue}
      onOpen={() => {
        getCategoryTransactions().then((newOptions) => {
          //console.log("newOptions");
          //console.log(newOptions);
          setOptions(newOptions);
        });
      }}
      onClose={handleClose}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          currentValue = newValue;
          /*setValue({
            name: newValue
          });*/
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          currentValue = newValue.inputValue;
          /*setValue({
            name: newValue.inputValue
          });*/
        } else {
          currentValue = "";
          /*setValue(newValue);*/
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`
          });
        }

        return filtered;
      }}
      autoSelect
      clearOnBlur
      handleHomeEndKeys
      id="balance_transaction_category_autocomplete"
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      freeSolo
      size="small"
      renderInput={(params) => (
        <TextField
          id="balance_transaction_category_input"
          {...params}
          variant="standard"
          label={appcopy["input.category"][config.app.language]}
        />
      )}
    />
  );
}

function handleClose() {
  currentValue = document.getElementById(
    "balance_transaction_category_autocomplete"
  ).value;
}

export function CategorySelectorSetValue(newValue) {
  currentValue = newValue;
  document.getElementById(
    "balance_transaction_category_autocomplete"
  ).value = currentValue;
}
export function CategorySelectorGetValue() {
  return currentValue;
}
