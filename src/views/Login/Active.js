import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Inputnew from "../../components/Inputnew";
import Stack from "@mui/material/Stack";
import { Box, styled } from "@mui/material";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import Container from "@mui/material/Container";
import Footer from "../../layouts/FullLayout/Footer/Footer";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import { Link, NavLink } from "react-router-dom";

const BoxCard = styled(Box)(({ them }) => ({
  backgroundColor: "#343434",
  minHeight: "100vh",
}));

export default function Active() {
  const [loading, setLoading] = React.useState(false);
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [email, setemail] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    const headerlist = {
      Accept: "*/*",
    };
    try {
      const resp = await axios.patch(
        "http://localhost:5000/require-to-active",
        {
          email: email,
        },
        {}
      );
      console.log("Email-------", email);

      if (resp.data.message == "success") {
        setLoading(false);
        alert("กรุณาเช็คอีเมล");
      } else if (resp.data.message == "user not found") {
        setLoading(false);
        alert("ไม่พบผู้ใช้ หรือ ท่านยืนยันตัวตนไปแล้ว");
      }
    } catch (err) {
      setLoading(false);
      alert("มีข้อผิดพลาด");
      console.log(err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BoxCard>
      <Progess load={loading}></Progess>
      <Container maxWidth="lg">
        <Stack spacing={1} justifyContent="center" alignItems={"center"}>
          <Grid container> </Grid>
          <Box
            component="img"
            src={logo}
            sx={{ maxWidth: "200px" }}
            mt="2rem!important"
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
            กรุณาใส่ E-Mail เพื่อยืนยันตัวตน
          </Typography>
          <TextField
            sx={{
              width: "450px",
              input: { color: "#fff" },
            }}
            required
            id="email"
            placeholder="E-mail"
            autoComplete="email"
            onChange={(e) => setemail(e.target.value)}
            color="primary3"
            focused
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#D9D9D9", color: "black", width: "150px" }}
            onClick={handleSubmit}
            setLoading={setLoading}
          >
            ยืนยันตัวตน
          </Button>
          <Box style={{ marginTop: "20px" }}>
            <Link
              style={{ color: "#D9D9D9", marginTop: "30px" }}
              to="/loginpage"
            >
              เข้าสู่ระบบ
            </Link>
          </Box>
        </Stack>
      </Container>
      <Box style={{ marginTop: "10%" }}>
        <Footer />
      </Box>
    </BoxCard>
  );
}
