import React, { useState } from "react";
import {
  FormGroup,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox
} from "@mui/material";

import config from "../../config";
import appcopy from "./copy";

export function TransactionDate() {
  const [value, setValue] = useState(Date());

  return (
    <input
      id="transaction_date"
      type="date"
      value={value}
      style={{ marginTop: 10, marginBottom: 10 }}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export function TransactionBy() {
  const [value, setValue] = useState("");

  return (
    <RadioGroup
      row
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
      }}
    >
      <h4>{appcopy["text.by"][config.app.language]}</h4>
      <FormControlLabel
        id="transaction_by_Alice"
        value="Alice"
        name="transaction_by"
        control={<Radio />}
        label="Alice"
        onChange={(e) => setValue(e.target.value)}
      />
      <FormControlLabel
        id="transaction_by_Pierre"
        value="Pierre"
        name="transaction_by"
        control={<Radio />}
        label="Pierre"
        onChange={(e) => setValue(e.target.value)}
      />
      <FormControlLabel
        id="transaction_by_"
        value=""
        name="transaction_by"
        control={<Radio />}
        label="None"
        onChange={(e) => setValue(e.target.value)}
        sx={{ display: "none" }}
      />
    </RadioGroup>
  );
}

export function TransactionFor(props) {
  const [valueAlice, setValueAlice] = useState(true);
  const [valuePierre, setValuePierre] = useState(true);

  return (
    <FormGroup
      row
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
      }}
    >
      <h4>{appcopy["text.for"][config.app.language]}</h4>
      <FormControlLabel
        control={
          <Checkbox
            value="Alice"
            name="transaction_for"
            id="transaction_for_Alice"
            checked={valueAlice}
            onChange={(e) => {
              setValueAlice(e.target.checked);
            }}
          />
        }
        label="Alice"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Pierre"
            name="transaction_for"
            id="transaction_for_Pierre"
            checked={valuePierre}
            onChange={(e) => {
              setValuePierre(e.target.checked);
            }}
          />
        }
        label="Pierre"
      />
    </FormGroup>
  );
}
