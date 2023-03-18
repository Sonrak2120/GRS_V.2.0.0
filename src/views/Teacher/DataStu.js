import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CheckButton from "./button/CheckButton";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { pink } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Box from "@mui/material/Box";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function DataStu() {
  const [value] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const headerlist = {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    };
    try {
      const delt = await axios({
        method: "POST",
        url: "http://34.124.184.200:5000/clear-all",
        headers: headerlist,
      });

      if (delt.data.message === "success") {
        alert("ลบข้อมูลทั้งหมด สำเร็จ");
        window.location.reload("Refresh");
      } else {
        alert("Error ลบข้อมูลไม่สำเร็จ");
        // window.location.reload("Refresh");
      }
      setOpen(false);
    } catch {
      alert("Error");
    }
  };

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ` + token,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://34.124.184.200:5000/get-student-data-to-check",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      // setTab(response.data.data);
      setRows(response.data.data.data);
      console.log("row = ", response.data.data.data);
    };
    api_();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h3"
          style={{
            margin: "auto 0",
            flexGrow: "1",
            fontWeight: 500,
            marginTop: "20px",
          }}
        >
          รายชื่อนิสิตในที่ปรึกษา
        </Typography>
        <Button onClick={handleClickOpen} variant="contained" color="error">
          Delete All
        </Button>
        <BootstrapDialog onClose={handleClose} open={open}>
          <BootstrapDialogTitle
            onClose={handleClose}
            sx={{
              backgroundColor: "#F65C5C",
              color: "#fff",
              fontFamily: "Kanit",
              textAlign: "center",
              fontSize: "26px",
              height: "65px",
            }}
          ></BootstrapDialogTitle>
          <DialogContent
            dividers
            sx={{ width: "500px!important", height: "150px!important" }}
          >
            <Grid container direction="row" alignItems="center">
              <Grid item sx={{ m: "auto" }}>
                <PriorityHighIcon sx={{ fontSize: 70, color: pink[500] }} />
              </Grid>
            </Grid>
            <Typography
              align="center"
              color="error"
              sx={{ fontFamily: "Kanit" }}
            >
              ต้องการลบข้อมูลผู้ใช้หรือไม่?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#D7D7D7" }}>
            <Button
              autoFocus
              color="error"
              variant="contained"
              onClick={handleSubmit}
            >
              ยืนยัน
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ bgcolor: "#fff", borderRadius: "15px" }}>
          <TabPanel value={value} index={value}>
            <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      รหัสนิสิต
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      ชื่อ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="left"
                    >
                      นามสกุล
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      Status
                    </TableCell>

                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((item, inx) => (
                    <TableRow
                      key={inx}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: "#D7EAD9",
                          boxShadow: "0 0 3px 1px #525B53",
                        },
                      }}
                    >
                      <TableCell sx={{ width: "20%" }} align="center">
                        {item.std_id}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "20%" }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell sx={{ width: "20%" }} align="left">
                        {item.surname}
                      </TableCell>
                      <TableCell sx={{ width: "20%" }} align="center">
                        <div style={{ display: "flex" }}>
                          {(() => {
                            if (item.status === "") {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "brue",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>รอการตรวจสอบ</p>
                                </div>
                              );
                            } else if (item.status === "PASS") {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "green",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>เรียนครบแล้ว</p>
                                </div>
                              );
                            } else if (item.status === "NOT PASS") {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "red",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>เรียนยังไม่ครบ</p>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "green",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>-</p>
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </TableCell>

                      <TableCell sx={{ width: "20%" }} align="center">
                        <CheckButton
                          row={inx}
                          rows={rows}
                          setRows={setRows}
                          std_id={item.std_id}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <Box sx={{ p: 3 }} />
        </Box>
      </Box>
    </div>
  );
}
