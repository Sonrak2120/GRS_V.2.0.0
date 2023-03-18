import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Inputnew2 from "../../components/Inputnew2";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { createTheme, withStyles } from "@mui/material/styles";
import logo from "../../assets/images/logo.png";
import Grid from "@mui/material/Grid";
import "../../App.css";

const BoxCard = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    backgroundColor: "#343434",
    minHeight: "100vh",
    minWidth: "100wh",
  },
  [theme.breakpoints.up("pm")]: {
    backgroundColor: "#343434",
    minHeight: "100vh",
    minWidth: "100wh",
  },
}));

const Err = () => {
  return (
    <div>
      <Typography variant="h1" gutterBottom align="center">
        Error
      </Typography>
      <Typography variant="h1" gutterBottom align="center">
        Invalid URL ❌
      </Typography>
    </div>
  );
};

const theme = createTheme();

const style_ = {
  header_text: { flexGrow: 1, fontFamily: "Kanit" },
  text_default: {
    flexGrow: 1,
    fontFamily: "Kanit",
    color: "#7D7F81",
  },
};

/**
 * เป็นส่วน Dialog หรือ popup ที่จะขึ้นมาตอนแก้ไขใส่ไว้รันได้
 */

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

/**
 *
 * ถึงตรงนี้
 */

export default function Verify() {
  const [depart, setDepart] = useState("");
  /**
   * เพิ่มมาใช้สำหรับปุ่มแก้ไข 2 ปุ่มครับพรี่
   */
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const { token } = useParams();
  const [user_name, setUser_name] = useState();
  const [user_surname, setUser_surname] = useState();
  const [err, setErr] = useState(false);
  const [Department, setDepartment] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");

  useEffect(() => {
    const resp = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: `http://localhost:5000/info-for-verification/${token}`,
        method: "GET",
        headers: headersList,
      };
      try {
        let response = await axios.request(reqOptions);
        setName(response.data.data.name);
        setSurname(response.data.data.surname);
        setEmail(response.data.data.email);
        setRole(response.data.data.role);

        console.log(response.data);
      } catch {
        alert("error");
      }
    };
    resp();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      alert("รหัสผ่านไม่ตรงกัน");
    } else if (password === password2 && password.length < 8) {
      alert("ความยาวรหัสผ่านต้องมากกว่าหรือเท่ากับ 8 ตัว");
    } else {
      try {
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          token: `${token}`,
          name: name,
          surname: surname,
          role: role,
          email: email,
          password: password,
        });

        let reqOptions = {
          url: "http://localhost:5000/verify",
          method: "PUT",
          headers: headersList,
          data: bodyContent,
        };

        let response = await axios.request(reqOptions);
        alert("ยืนยันสำเร็จ");
        window.location.assign("/");
      } catch (err) {
        alert("มีข้อผิดพลาด");
        console.log(err);
      }
    }
  };

  const handleChange = (event) => {
    setDepart(event.target.value);
    console.log(event.target.value);
  };
  if (err) {
    return <Err />;
  }
  return (
    <BoxCard
      // onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        wrap: "nowrap",
      }}
    >
      {/* ก็อปยาวได้ */}
      {/* <Grid container> </Grid> */}
      <Box
        component="img"
        src={logo}
        sx={{ maxWidth: "200px" }}
        mt="3rem!important"
        mb="2rem!important"
      />
      <Typography variant="h4" color={"white"}>
        Graduation Requirements System
      </Typography>
      <Typography variant="h3" color={"white"}>
        ยืนยันตัวตน
      </Typography>
      <Typography
        variant="h6"
        mt="1rem!important"
        color={"rgba(255,255,255,0.7)"}
      >
        กรุณายืนยันตัวตน เพื่อเข้าสู่ระบบ
      </Typography>

      <Grid sx={{ mt: "20px" }}>
        <Grid2
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid2>
            <TextField
              disabled
              id="filled-disabled"
              label="ชื่อ"
              value={name}
              variant="filled"
              sx={{
                width: "450px",
                "& .css-ugbsi5-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                  {
                    color: "white",
                  },
                "& .css-10botns-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                  { "-webkit-text-fill-color": "white" },
                "& .css-geon7s-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                  { "-webkit-text-fill-color": "#ffffff82" },
              }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid2>
          <Grid2>
            <TextField
              color="primary"
              disabled
              id="filled-disabled"
              label="นามสกุล"
              value={surname}
              variant="filled"
              sx={{
                width: "450px",
                "& .css-ugbsi5-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                  {
                    color: "white",
                  },
                "& .css-10botns-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                  { "-webkit-text-fill-color": "white" },
                "& .css-geon7s-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                  { "-webkit-text-fill-color": "#ffffff82" },
              }}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Grid2>
          <TextField
            sx={{
              width: "450px",
              "& .css-ugbsi5-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                {
                  color: "white",
                },
              "& .css-10botns-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                { "-webkit-text-fill-color": "white" },
              "& .css-geon7s-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                { "-webkit-text-fill-color": "#ffffff82" },
              "& .css-kdqih4-MuiInputBase-root-MuiFilledInput-root": {
                color: "#ffff",
              },
            }}
            required
            variant="filled"
            id="password"
            type="password"
            placeholder="ตั้งรหัสผ่าน"
            autoComplete="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <TextField
            sx={{
              width: "450px",
              "& .css-ugbsi5-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                {
                  color: "white",
                },
              "& .css-10botns-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                { "-webkit-text-fill-color": "white" },
              "& .css-geon7s-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                { "-webkit-text-fill-color": "#ffffff82" },

              "& .css-kdqih4-MuiInputBase-root-MuiFilledInput-root": {
                color: "#ffff",
              },
              marginTop: "20px",
            }}
            required
            variant="filled"
            id="password2"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            autoComplete="password"
            onChange={(e) => setpassword2(e.target.value)}
          />
          <Typography sx={{ fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>
            โปรดตั้งรหัสผ่านอย่างน้อย 8 ตัว
          </Typography>
        </Grid2>

        <Grid2
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={"20px"}
          mb={"30px"}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </Grid2>
      </Grid>
    </BoxCard>
  );
}
