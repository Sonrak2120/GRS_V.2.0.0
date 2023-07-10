import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
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
import Progess from "../../layouts/FullLayout/Sidebar/Progess";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Box from "@mui/material/Box";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { display } from "@material-ui/system";

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

export default function DataCourse() {
  const [value] = useState(0);
  const [rows, setRows] = useState([]);
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("all");
  const [status, setStatus] = useState(2);
  const [section, setSection] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sub_to_del, set_sub_to_del] = useState(null);
  const [page, setPage] = useState(0);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const onClickUpload = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file_course", file.file);
      const Updatecourse = await axios({
        method: "PATCH",
        url: "http://127.0.0.1:5000/add-course",
        data: formData,
        headers: {
          Authorization: `Bearer ` + token,
          Accept: "*/*",
        },
      });

      setLoading(true);

      alert("บันทึกข้อมูลแล้ว");
      setLoading(false);
      setTrigger(!trigger);
      // window.location.reload("Refresh");
    } catch {
      setLoading(false);
      alert("Error อัปโหลดไฟล์ไม่ถูกต้อง");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ` + token,

      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      course_id: sub_to_del,
    });
    let reqOptions = {
      url: "http://127.0.0.1:5000/del-course-info",
      method: "PUT",
      headers: headersList,
      data: bodyContent,
    };
    let response = await axios.request(reqOptions);
    if (response.data.message == "delete success") {
      alert("ลบข้อมูลสำเร็จ");
      window.location.reload();
    }
  };

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ` + token,
        // "Content-Type": "application/json",
        "Content-Type": "application/json",
      };
      let bodyContent = JSON.stringify({
        year: year,
        status: status,
        section: section,
      });
      let reqOptions = {
        url: "http://127.0.0.1:5000/get-course-info",
        method: "GET",
        headers: headersList,
        data: bodyContent,
      };
      let response = await axios.request(reqOptions);
      console.log("response = ", response);
      // setTab(response.data.data);
      setRows(response.data.data);
      console.log("row = ", response.data.data.data);
    };
    api_();
  }, [trigger]);

  return (
    <div>
      <Progess load={loading} />
      <Box sx={{ minWidth: 120, display: "flex" }}></Box>
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
          รายการหลักสูตร{" "}
        </Typography>

        {/* <Button onClick={handleClickOpen} variant="contained" color="success">
          upload ข้อมูล
        </Button> */}
        <div style={{ display: "flex" }}>
          <Typography
            variant="h3"
            style={{
              margin: "auto",
              marginRight: "20px",
              flexGrow: "1",
              fontWeight: 500,
            }}
          >
            upload ไฟล์
          </Typography>

          <input
            onChange={(e) => {
              setFile({ file: e.target.files[0] });
            }}
            style={{
              margin: "auto",
            }}
            type="file"
            accept=".xlsx"
          ></input>
          {file.file ? (
            <Button
              onClick={onClickUpload}
              variant="contained"
              color="success"
              type="button"
            >
              Upload
            </Button>
          ) : (
            <Button disabled variant="contained" color="success" type="button">
              Upload
            </Button>
          )}
        </div>

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
              ต้องการลบข้อมูลหลักสูตรหรือไม่?
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
                      ลำดับ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      รหัสหลักสูตร
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="left"
                    >
                      ชื่อหลักสูตร
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, inx) => (
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
                        <TableCell sx={{ width: "5%" }} align="center">
                          {inx + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell sx={{ width: "15%" }} align="center">
                          {item.course_id}
                        </TableCell>
                        <TableCell sx={{ width: "20%" }} align="left">
                          {item.course_name}
                        </TableCell>

                        <TableCell sx={{ width: "7%" }} align="center">
                          <Button
                            onClick={() => {
                              set_sub_to_del(item.course_id);
                              setOpen(true);
                            }}
                            variant="contained"
                            color="error"
                          >
                            ลบ
                          </Button>

                          {/* <CheckButton
                            row={inx}
                            rows={rows}
                            setRows={setRows}
                            std_id={item.std_id}
                            page={page}
                            rowsPerPage={rowsPerPage}
                          /> */}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                ".MuiTablePagination-toolbar": {
                  color: "rgb(41, 39, 39)",
                },
              }}
            />
          </TabPanel>
          <Box sx={{ p: 3 }} />
        </Box>
        <div
          style={{
            padding: "10px",
          }}
        >
          <a href="http://127.0.0.1:5000/download-add-subject-form">
            Download ตัวอย่าง
          </a>
        </div>
      </Box>
    </div>
  );
}
