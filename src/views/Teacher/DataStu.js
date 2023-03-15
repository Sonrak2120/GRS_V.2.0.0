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

import Box from "@mui/material/Box";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

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

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-student-data-to-check",
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
                                  <p>ผ่านแล้ว</p>
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
