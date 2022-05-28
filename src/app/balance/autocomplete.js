
              <Autocomplete
                defaultValue={this.state.transaction.category}
                onChange={(event, newValue) => {
                  let a = "";
                  if (typeof newValue === "string") {
                    a = newValue; // OK
                    //console.log("Case 1 : " + a);
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    a = newValue.inputValue; // OK
                    //console.log("Case 2 : " + a);
                  } else {
                    a = newValue.name; // OK
                    //console.log("Case 3 : " + a);
                    //console.log(a);
                  }
                  event.target = {
                    name: "category",
                    value: a
                  };
                  this.handleChange(event, a);
                }}
                onOpen={this.hanldeOpenCategorySelector}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = this.state.options.some(
                    (option) => inputValue === option.name
                  );
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
                options={this.state.options}
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
                /*renderOption={(props, option) => (
                  <li
                    {...props}
                    name="category"
                    value={option.name}
                    onClick={(e) => {
                      e.target = {
                        name: "category",
                        value: option.name
                      };
                      this.handleChange(e, option.name);
                    }}
                  >
                    {option.name}
                  </li>
                )}*/
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                freeSolo
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={appcopy["input.category"][config.app.language]}
                  />
                )}
              />