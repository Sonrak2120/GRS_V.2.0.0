import React from "react";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

const TextFieldCustom = styled(TextField)(({ them }) => ({
  "& .css-4pwcjw-MuiInputBase-root-MuiFilledInput-root.Mui-disabled": {
    opacity: "1",
    color: "rgba(255, 0, 0)",
  },
}));

const Inputnew2 = (props) => {
  return <TextFieldCustom {...props} />;
};

export default Inputnew2;
