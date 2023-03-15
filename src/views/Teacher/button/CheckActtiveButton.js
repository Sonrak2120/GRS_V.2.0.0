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
import axios from "axios";
import DubleCheckButton from "./DubleCheckButton";

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

export default function CheckActtiveButton({
  row2,
  rows2,
  setRows2,
  depart_inx,
}) {
  const [open, setOpen] = React.useState(false);

  const token = sessionStorage.getItem("token");
  const [check, setCheck] = React.useState([]);
  const [subcode, setSubcode] = React.useState([]);
  const [stdId, setStId] = React.useState("");
  const [stdsurname, setStsurname] = React.useState("");
  const [stdname, setStname] = React.useState("");
  const [comment, setComment] = React.useState("");

  const sentToStudent = async (event) => {
    const body = {
      std_id: stdId,
      sub_code: subcode,
      result: check,
      comment: comment,
      name: stdname,
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      ...body,
    });

    let reqOptions = {
      url: "http://localhost:5000/sent-check-result",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    try {
      let response = await axios.request(reqOptions);
      alert("สำเร็จเเล้ว");

      window.location.reload("Refresh");
      setOpen(false);
    } catch {
      alert("ไม่สำเร็จ");
      window.location.reload("Refresh");
      setOpen(false);
    }
  };

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
          ตรวจสอบการจบของนิสิตในที่ปรึกษา
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <PageAcive
            setOpen={setOpen}
            row2={row2}
            rows2={rows2}
            setRows2={setRows2}
            check={check}
            setCheck={setCheck}
            subcode={subcode}
            setSubcode={setSubcode}
            setStId={setStId}
            setStsurname={setStsurname}
            setStname={setStname}
            depart_inx={depart_inx}
          />
        </DialogContent>
        <DialogActions>
          <DubleCheckButton
            stdId={stdId}
            stdsurname={stdsurname}
            stdname={stdname}
            sentToStudent={sentToStudent}
            comment={comment}
            setComment={setComment}
          />

          <Button autoFocus onClick={handleClose}>
            ปิด
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
