import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CheckActtiveButton from "./button/CheckActtiveButton";
import { useState } from "react";
import Button from "@mui/material/Button";
import "../../App.css";
export default function ActiveStu() {
  const token = sessionStorage.getItem("token");
  const [rows2, setRows2] = React.useState([]);
  const [ispass, setispass] = useState("");
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ` + token,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-student-data-require",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setRows2(response.data.data);

      console.log(response.data);
    };
    api_();
  }, []);

  return (
    <div>
      <h5>รายชื่อนิสิตส่งคำร้องตรวจสอบการจบการศึกษาของนิสิตในที่ปรึกษา</h5>
      <div>
        <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
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
                  รหัสนิสิต
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "16px" }}
                  align="center"
                >
                  สถานะ
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
              {rows2.map((row2, inx) => (
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
                  <TableCell component="th" scope="row2" sx={{ width: "20%" }}>
                    {row2.name}
                  </TableCell>
                  <TableCell sx={{ width: "20%" }} align="left">
                    {row2.surname}
                  </TableCell>
                  <TableCell sx={{ width: "20%" }} align="center">
                    {row2.std_id}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <div style={{ display: "flex" }}>
                      {(() => {
                        if (row2.status === "") {
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
                              <p>รอการตรวจสอบ</p>
                            </div>
                          );
                        } else if (row2.status === "CHECK") {
                          return (
                            <div
                              style={{
                                display: "flex",
                                color: "blue",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                margin: "auto",
                              }}
                            >
                              <p>รอการตรวจสอบ</p>
                            </div>
                          );
                        } else if (row2.status === "NOT PASS") {
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
                              <p>ยังไม่ผ่าน</p>
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
                              <p>ตรวจสอบผ่านแล้ว</p>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {(() => {
                        if (row2.status === "") {
                          return (
                            <div>
                              <CheckActtiveButton
                                row2={inx}
                                rows2={rows2}
                                setRows2={setRows2}
                              />
                            </div>
                          );
                        } else if (row2.status === "CHECK") {
                          return (
                            <CheckActtiveButton
                              row2={inx}
                              rows2={rows2}
                              setRows2={setRows2}
                            />
                          );
                        } else if (row2.status === "NOT PASS") {
                          return (
                            <Button
                              variant="contained"
                              disabled
                              row2={inx}
                              rows2={rows2}
                              setRows2={setRows2}
                            >
                              ตรวจสอบแล้ว
                            </Button>
                          );
                        } else {
                          return (
                            <Button
                              variant="contained"
                              disabled
                              row2={inx}
                              rows2={rows2}
                              setRows2={setRows2}
                            >
                              ตรวจสอบแล้ว
                            </Button>
                          );
                        }
                      })()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
