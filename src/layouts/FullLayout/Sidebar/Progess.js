import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Progess({ load }) {
  return (
    <Backdrop sx={{ color: "#39cb7f", zIndex: 100 }} open={load}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
