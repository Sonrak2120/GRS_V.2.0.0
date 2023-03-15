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
import axios from "axios";
import HistoryPage from "../HistoryPage";

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
  const { children, onClose, data, ...other } = props;

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

export default function HistoryButton({
  row2,
  rows2,
  setRows2,
  row,
  stdId,
  index,
  data,
}) {
  const [open, setOpen] = React.useState(false);
  const token = sessionStorage.getItem("token");
  const [check, setCheck] = React.useState([]);
  const [subcode, setSubcode] = React.useState([]);
  // const [stdId, setStId] = React.useState("");
  const [datadate, setDataDate] = React.useState("");
  const [datatime, setDataTime] = React.useState("");
  const [checkdate, setCheckDate] = React.useState("");
  const [checktime, setCheckTime] = React.useState("");
  const [sentdate, setSentDate] = React.useState("");
  const [senttime, setSentTime] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ตรวจสอบประวัติ
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
          ตรวจสอบการจบของนิสิตในที่ปรึกษา
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* <Typography gutterBottom>รอใส่ตารางข้อมูลนิสิต</Typography> */}
          <HistoryPage
            setOpen={setOpen}
            row2={row2}
            rows2={rows2}
            row={row}
            setRows2={setRows2}
            check={check}
            setCheck={setCheck}
            subcode={subcode}
            setSubcode={setSubcode}
            stdId={stdId}
            index={index}
            history={data}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button variant="contained" onClick={sentToStudent}>
            ส่งผลตรวจ
          </Button> */}
          <Button autoFocus onClick={handleClose}>
            ปิด
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
