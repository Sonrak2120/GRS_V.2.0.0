import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CheckButton from "./button/CheckButton";
import { styled } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import CheckActtiveButton from "./button/CheckActtiveButton";
import HistoryButton from "./button/HistoryButton";
import "../../App.css";

const Table_custom = styled("Table")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "100%",
    marginLeft: "30px",
  },
}));

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#02bc77",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: "'Prompt', sans-serif;",
    "&:hover": {
      color: "#02bc77",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#02bc77",
      // backgroundColor: "#2f3337",
      borderRadius: "15px",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

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

export default function CollapsibleTable() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [tab, setTab] = React.useState([]);

  const [rows2, setRows2] = React.useState([]);
  const [groups, setgrop] = React.useState([]);
  const [nums, setNums] = React.useState([]);
  const [donts, setDont] = React.useState([]);
  const [datas, setDatas] = React.useState([]);
  const [stdId, setStId] = React.useState("");
  const [datadate, setDataDate] = React.useState("");
  const [datatime, setDataTime] = React.useState("");
  const [checkdate, setCheckDate] = React.useState("");
  const [checktime, setCheckTime] = React.useState("");
  const [sentdate, setSentDate] = React.useState("");
  const [senttime, setSentTime] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-student-data-require",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setTab(response.data.data);

      setStId(response.data.data);
      // setDataDate(rows2[row2].group.data_date);
      // setDataTime(rows2[row2].group.data_time);
      // setCheckDate(rows2[row2].group.check_date);
      // setCheckTime(rows2[row2].group.check_time);
      // setSentDate(rows2[row2].group.sent_date);
      // setSentTime(rows2[row2].group.sent_time);

      const data = response.data.data;
      setRows2(response.data.data);
      setgrop(data);
    };

    api_();
  }, []);

  function Row(props) {
    const { row2, group, inx } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell sx={{ width: "50px" }}>
            <IconButton
              aria-label="expand row2"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row2.std_id}</TableCell>
          <TableCell align="left">{row2.name}</TableCell>
          <TableCell align="left">{row2.surname}</TableCell>

          <TableCell align="center">
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
          <TableCell align="center">
            {row2.sent_date}
            {"-"}
            {row2.sent_time}
          </TableCell>
          <TableCell align="center">
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
                        depart_inx={value}
                      />
                    </div>
                  );
                } else if (row2.status === "CHECK") {
                  return (
                    <CheckActtiveButton
                      row2={inx}
                      rows2={rows2}
                      setRows2={setRows2}
                      depart_inx={value}
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
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  ประวัติการตรวจสอบ
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        รหัสนิสิต
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>ชื่อ</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>นามสกุล</TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        สถานะ
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        วัน/เวลา ที่ตรวจสอบ
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {group.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell />
                        <TableCell>{row.std_id}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.surname}</TableCell>
                        <TableCell align="center">
                          {/* {row.status} */}
                          <div style={{ display: "flex" }}>
                            {(() => {
                              if (row.status === "") {
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
                              } else if (row.status === "CHECK") {
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
                              } else if (row.status === "NOT PASS") {
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
                        <TableCell align="center">
                          {row.check_date}
                          {"-"}
                          {row.check_time}
                        </TableCell>
                        <TableCell align="center">
                          <HistoryButton
                            row2={inx}
                            rows2={rows2}
                            row={row}
                            setRows2={setRows2}
                            stdId={stdId}
                            index={index}
                            data={row}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  if (groups.length > 0) {
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
            ตรวจสอบการจบการศึกษา
          </Typography>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ bgcolor: "#fff", borderRadius: "15px" }}>
            <AntTabs
              value={value}
              onChange={handleChange}
              aria-label="ant example"
            >
              {tab.map((row, inx) => (
                <AntTab
                  key={inx}
                  label={
                    row.department.depart_id + " " + row.department.depart_name
                  }
                />
              ))}
            </AntTabs>

            <TabPanel value={value} index={value}>
              {tab[value]?.std_in_depart.map((item, inx) => {
                return (
                  <TableContainer
                    key={inx.toString()}
                    sx={{
                      mb: "16px",
                      alignItems: "center",
                      justifyContent: "center",
                      m: "aotu",
                      display: "flex",
                    }}
                  >
                    <Table_custom aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell
                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                          >
                            รหัสนิสิต
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                          >
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
                            สถานะ
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                            align="center"
                          >
                            วัน/เวลา
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
                        <Row row2={item?.head} inx={inx} group={item.group} />
                        {console.log("item?.head", item)}
                      </TableBody>
                    </Table_custom>
                  </TableContainer>
                );
              })}
            </TabPanel>
            <Box sx={{ p: 3 }} />
          </Box>
        </Box>
      </div>
    );
  }
  return (
    <>
      <div className="tables">
        <Typography color="#0000008f" fontSize={30}>
          ยังไม่มีนิสิตที่ยื่นตรวจ
        </Typography>
      </div>
    </>
  );
}
