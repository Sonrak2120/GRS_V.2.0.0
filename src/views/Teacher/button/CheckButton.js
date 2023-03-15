import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PageAcive from "../PageAcive";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    "& .MuiDialog-paper": { minWidth: "100vw", maxHight: "100%" },
    "& .MuiDialogContent-root": { padding: 0 },
  },
  [theme.breakpoints.up("xl")]: {
    "& .MuiDialog-paper": { minWidth: "60vw", maxHight: "100%" },
    "& .MuiDialogContent-root": { padding: 0 },
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CheckButton({ row, rows, setRows, std_id }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ตรวจสอบ
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          ตรวจสอบการการรียนของนิสิตในที่ปรึกษา
        </BootstrapDialogTitle>
        <DialogContent dividers style={{ width: "100%" }}>
          <PageAcive
            row2={row}
            rows2={rows}
            setRows={setRows}
            std_id={std_id}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            ปิด
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
