import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function DubleCheckButton({
  stdId,
  stdname,
  stdsurname,
  sentToStudent,
  comment,
  setComment,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        ส่งผลตรวจ
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ fontSize: "21px", fontWeight: "bold" }}
          id="alert-dialog-title"
        >
          ส่งผลการตรวจสอบ
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ยืนยันที่จะส่งผล "การตรวจสอบการจบการศึกษา" <br /> ให้กับ {stdId}{" "}
            {stdname} {stdsurname} หรือไม่
            <br />
          </DialogContentText>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            comment
          </Typography>

          <TextField
            id="filled-search"
            label="หมายเหตุ..."
            type="search"
            variant="filled"
            style={{ width: "100%" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"danger"}>
            ยกเลิก
          </Button>
          <Button onClick={sentToStudent} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
