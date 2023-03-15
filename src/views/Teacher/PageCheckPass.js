import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { styled } from "@mui/material";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import { useState } from "react";

import "../../App.css";

const Typo_custom = styled("Typography")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    marginBottom: "20px",

    fontWeight: 250,
    fontSize: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "-0.06px",
  },
  [theme.breakpoints.up("xl")]: {
    marginBottom: "30px",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 30,
    letterSpacing: "-0.06px",
  },
}));

const Grid_custom = styled("Box")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.up("xl")]: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 100,
    top: 180,
  },
}));

const Table_custom = styled("Table")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "100%",
    marginLeft: "30px",
  },
}));

export default function CollapsibleTable({
  row,
  rows,
  setRows,
  setOpen,
  onNav,
  std_id,
}) {
  const [rowsT, setRowsT] = React.useState([]);
  const [groups, setgrop] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [num, setNum] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [data_rows, setdatarows] = useState([]);

  console.log("rows", rows);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const api_ = async () => {
      // console.log(rows[row][0]);
      let headersList = {
        Authorization: `Bearer ${token}`,

        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        std_id: std_id,
      });

      let reqOptions = {
        url: "http://localhost:5000/get-sub-progress-info-for-nisit",
        method: "PATCH",
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
      console.log(response.data);

      const data = response.data.data;
      setName(response.data.course_name);
      setNum(response.data.allcredit);
      setRowsT(response.data.data);
      setgrop(data);
      console.log(response.data.data);
    };
    api_();
  }, []);
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const sortRow = row.subject_group.sort((a, b) => a.term - b.term);
    const term1 = sortRow.filter((item) => item?.term === "0");
    const term2 = sortRow.filter((item) => item?.term === "1");

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell sx={{ width: "50px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.group[0]}</TableCell>
          <TableCell align="center">
            {row.group[1]} {"หน่วยกิต"}
            {(() => {
              if (row.group[2] === "") {
                return <></>;
              } else {
                return (
                  <Typography
                    style={{
                      // backgroundColor: "#02BC77",
                      // borderRadius: "20px",
                      color: "red",
                      alignItems: "center",
                      textAlign: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                    }}
                  >
                    {"( N = " + row.group[2] + " หน่วยกิต )"}
                  </Typography>
                );
              }
            })()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Stack spacing={2} sx={{ margin: 1 }}>
                {term1?.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom component="div">
                      {`ภาคต้น`}
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ width: "25%" }}
                          >
                            รหัสวิชา
                          </TableCell>
                          <TableCell sx={{ width: "25%" }}>ชื่อวิชา</TableCell>
                          <TableCell align="center">หน่วยกิต</TableCell>
                          <TableCell align="center">เกรด</TableCell>
                          <TableCell align="center">ชั้นปี</TableCell>
                        </TableRow>
                      </TableHead>
                      {term1.map((item, index) => {
                        return (
                          <TableBody>
                            <TableRow key={index.toString()}>
                              <TableCell />
                              <TableCell component="th" scope="row">
                                {item.education_id}
                              </TableCell>
                              <TableCell>{item.education_name}</TableCell>
                              <TableCell align="center">
                                {item.credit}
                              </TableCell>
                              <TableCell align="center">
                                <div
                                  style={{
                                    display: "flex",
                                    color: item.grade === "N" && "red",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>{item.grade}</p>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                {item.class_grade}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                    </Table>
                  </>
                )}
                {term2?.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom component="div">
                      {`ภาคปลาย`}
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ width: "25%" }}
                          >
                            รหัสวิชา
                          </TableCell>
                          <TableCell sx={{ width: "25%" }}>ชื่อวิชา</TableCell>
                          <TableCell align="center">หน่วยกิต</TableCell>
                          <TableCell align="center">เกรด</TableCell>
                          <TableCell align="center">ชั้นปี</TableCell>
                        </TableRow>
                      </TableHead>
                      {term2.map((item, index) => {
                        return (
                          <TableBody>
                            <TableRow key={index.toString()}>
                              <TableCell />
                              <TableCell component="th" scope="row">
                                {item.education_id}
                              </TableCell>
                              <TableCell>{item.education_name}</TableCell>
                              <TableCell align="center">
                                {item.credit}
                              </TableCell>
                              <TableCell align="center">{item.grade}</TableCell>
                              <TableCell align="center">
                                {item.class_grade}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                    </Table>
                  </>
                )}
              </Stack>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  if (groups.length > 0) {
    return (
      <TableContainer component={Paper}>
        <Progess load={loading}></Progess>
        {rowsT.map((row, index) => (
          <Table_custom
            aria-label="collapsible table"
            key={index}
            sx={{ width: "80%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "80%", fontWeight: "1000", fontSize: "21px" }}
                >
                  {row.section[0]}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ width: "20%", fontWeight: "600", fontSize: "16px" }}
                >
                  {row.section[1]} {"หน่วยกิต"}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {groups[index].sub_n_grade.map((rowSub) => {
                return <Row key={rowSub.group} row={rowSub} />;
              })}
            </TableBody>
          </Table_custom>
        ))}
      </TableContainer>
    );
  }
  return (
    <>
      <div className="tables">
        <Typography color="#0000008f" fontSize={30}>
          เจ้าหน้าที่ยังไม่อัปโหลดข้อมูล
        </Typography>
      </div>
    </>
  );
}
