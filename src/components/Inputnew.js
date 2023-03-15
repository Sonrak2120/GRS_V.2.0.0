import React from "react";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

const TextFieldCustom = styled(TextField)(({ them }) => ({
  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: "rgba(255,255,255,0.3)",
    border: "2px solid white",
  },
}));

const Inputnew = (props) => {
  return <TextFieldCustom {...props} />;
};

export default Inputnew;
