import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function setupDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        id="transaction_date"
        label="Date"
        value={Date()}
        onChange={() => console.log("Changed date")}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
exports.setupDatePicker = () => {
  setupDatePicker();
};

function getDate() {
  return 3;
}
exports.getDate = () => {
  getDate();
};
