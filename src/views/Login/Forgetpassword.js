import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stack, Grid } from "@mui/material";
import logo from "../../assets/images/logo.png";
import Footer from "../../layouts/FullLayout/Footer/Footer";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../App.css";

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

const BoxCard = styled(Box)(({ them }) => ({
  backgroundColor: "#343434",
  minHeight: "100vh",
}));

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

export default function Forgetpassword() {
  const [depart, setDepart] = useState("");
  /**
   * เพิ่มมาใช้สำหรับปุ่มแก้ไข 2 ปุ่มครับพรี่
   */
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
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

  useEffect(() => {
    const resp = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: `http://localhost:5000/get-info-forget-password-user/${token}`,
        method: "GET",
        headers: headersList,
      };
      try {
        let response = await axios.request(reqOptions);
        setName(response.data.name);
        setSurname(response.data.surname);
        setemail(response.data.email);
        setRole(response.data.role);

        console.log(response);
        if (response.data.message === "not found") {
          setErr(true);
        }
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
          email: email,
          password: password,
          role: role,
        });

        let reqOptions = {
          url: "http://localhost:5000/forget-password-get-new-password",
          method: "PUT",
          headers: headersList,
          data: bodyContent,
        };

        let response = await axios.request(reqOptions);
        if (response.data.message === "success") {
          alert("บันทึกรหัสผ่านใหม่สำเร็จ");
          window.location.assign("/");
        } else {
          alert("มีข้อผิดพลาด");
        }
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
    <BoxCard>
      <Container maxWidth="lg">
        <Stack spacing={1} justifyContent="center" alignItems={"center"}>
          <Grid container> </Grid>
          <Box
            component="img"
            src={logo}
            sx={{ maxWidth: "200px" }}
            mt="5rem!important"
            mb="2rem!important"
          />
          <Typography variant="h4" color={"white"}>
            Graduation Requirements System
          </Typography>
          <Typography variant="h3" color={"white"}>
            เปลี่ยนรหัสผ่าน
          </Typography>
          {/* <Typography
            variant="h6"
            mt="1rem!important"
            color={"rgba(255,255,255,0.7)"}
          >
            กรุณาใส่ E-Mail เพื่อเปลี่ยนรหัสผ่าน
          </Typography> */}
          <TextField
            sx={{
              width: "450px",
              "& .css-183vkw9-MuiInputBase-root-MuiOutlinedInput-root": {
                color: "white",
              },
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                "border-color": "white",
              },
            }}
            required
            id="password"
            type="password"
            placeholder="รหัสผ่านใหม่"
            autoComplete="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <TextField
            sx={{
              width: "450px",
              "& .css-183vkw9-MuiInputBase-root-MuiOutlinedInput-root": {
                color: "white",
              },
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                "border-color": "white",
              },
            }}
            required
            id="password2"
            type="password"
            placeholder="ยืนยันรหัสผ่านใหม่"
            autoComplete="password"
            onChange={(e) => setpassword2(e.target.value)}
          />
          <Typography sx={{ fontSize: "15px", color: "rgba(0,0,0,0.5)" }}>
            โปรดตั้งรหัสผ่านอย่างน้อย 8 ตัว
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#D9D9D9", color: "black", width: "150px" }}
            onClick={handleSubmit}
          >
            บันทึกรหัสผ่านใหม่
          </Button>
        </Stack>
      </Container>
      <Box style={{ marginTop: "6%" }}>
        <Footer />
      </Box>
    </BoxCard>
  );
}
