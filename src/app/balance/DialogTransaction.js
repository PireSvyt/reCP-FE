import * as React from "react";
import Moment from "moment";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemButton,
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Swipeable from "react-mui-swipeable";
//import { ThemeProvider } from "@mui/material/styles";

import config from "../../config";
import appcopy from "./copy";
//import { theme } from "../theme";
import {
  TransactionDate,
  TransactionBy,
  TransactionFor
} from "./balancecomponents";
import {
  getTransaction,
  getTransactions,
  createTransaction,
  modifyTransaction,
  deleteTransaction
} from "./api/transactions";
import { getCategoryTransaction } from "./api/categorytransactions";
import getBalance from "./api/balance";

var open = true;
var selectedTransaction = "";

export default class DialogTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: "none"
    };
  }
  render() {
    return (
      <div>
        <Button
          id="dialogtransaction_trigger"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Dialog transaction trigger
        </Button>
        <Dialog
          id="dialog_transaction"
          sx={{ display: "none" }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Transaction</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <TextField
                id="dialogtransaction_name"
                label={appcopy["input.name"][config.app.language]}
                variant="standard"
              />
              <TransactionDate />
              <TextField
                id="dialogtransaction_amount"
                label={appcopy["input.amount"][config.app.language]}
                variant="standard"
              />

              <h4>{appcopy["text.by"][config.app.language]}</h4>
              <RadioGroup
                row
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}
              >
                <FormControlLabel
                  id="dialogtransaction_by_Alice"
                  value="Alice"
                  name="dialogtransaction_by"
                  control={<Radio />}
                  label="Alice"
                />
                <FormControlLabel
                  id="dialogtransaction_by_Pierre"
                  value="Pierre"
                  name="dialogtransaction_by"
                  control={<Radio />}
                  label="Pierre"
                />
                <FormControlLabel
                  id="dialogtransaction_by_"
                  value=""
                  name="dialogtransaction_by"
                  control={<Radio />}
                  label="None"
                  sx={{ display: "none" }}
                />
              </RadioGroup>

              <h4>{appcopy["text.for"][config.app.language]}</h4>
              <FormGroup
                row
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Alice"
                      name="dialogtransaction_for"
                      id="dialogtransaction_for_Alice"
                    />
                  }
                  label="Alice"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Pierre"
                      name="dialogtransaction_for"
                      id="dialogtransaction_for_Pierre"
                    />
                  }
                  label="Pierre"
                />
              </FormGroup>

              <TextField
                id="dialogtransaction_category"
                label={appcopy["input.category"][config.app.language]}
                variant="standard"
              />

              <Button
                id="balance_savetransaction"
                variant="contained"
                sx={{ m: 5, bgcolor: "" }}
              >
                {appcopy["button.save"][config.app.language]}
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CLOSE</Button>
            <Button onClick={handleClose}>SAVE</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  componentDidMount() {}
}

function handleClickOpen() {
  document.getElementById("dialog_transaction").style.display = "block";
}

function handleClose() {
  document.getElementById("dialog_transaction").style.display = "none";
}
