import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import logo from "../../assets/images/logo.png";
import Inputnew from "../../components/Inputnew";
import axios from "axios";
import Footer from "../../layouts/FullLayout/Footer/Footer";

const BoxCard = styled(Box)(({ them }) => ({
  backgroundColor: "#343434",
  minHeight: "100vh",
}));

export default function LoginPage({ SetRole }) {
  // const [isLogin, SetisLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    const headerlist = {
      Accept: "*/*",
    };
    const bodylist = {
      email: email,
      password: password,
    };
    try {
      const resp = await axios.post(
        "http://34.126.149.156:5000/log-in",
        {
          email: email,
          password: password,
          headers: headerlist,
        },
        {}
      );
      console.log(headerlist["Authorization"]);
      console.log(resp.data.data);
      SetRole(resp.data["data"]["role"]);
      sessionStorage.setItem("role", resp.data["data"]["role"]);
      sessionStorage.setItem("token", resp.data.data.token);

      if (resp.data["data"]["role"] === "admin") {
        console.log(resp.data["data"]["role"]);
        navigate("/teacher");
      } else {
        alert("You are not a User");
      }
    } catch (err) {
      console.log(err);
      alert("You are not a User");
    }
  };

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
          <Typography variant="h4" color={"white"}>
            for Computer Science Department
          </Typography>
          <Typography variant="h6" color={"white"}>
            ระบบตรวจสอบการจบการศึกษา
          </Typography>
          <Typography
            variant="h6"
            mt="1rem!important"
            color={"rgba(255,255,255,0.7)"}
          >
            โปรดเข้าสู่ระบบ
          </Typography>
          <Inputnew
            sx={{
              width: "450px",
              "& .css-16klrgp-MuiInputBase-root-MuiOutlinedInput-root": {
                color: "rgba(255,255,255,0.8)",
              },
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                "border-color": "white",
              },
            }}
            required
            id="email"
            placeholder="E-mail"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Inputnew
            sx={{
              width: "450px",
              "& .css-16klrgp-MuiInputBase-root-MuiOutlinedInput-root": {
                color: "rgba(255,255,255,0.8)",
              },
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                "border-color": "white",
              },
            }}
            required
            placeholder="Password"
            id="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              return setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#D9D9D9", color: "black", width: "150px" }}
            onClick={onLoginSubmit}
          >
            เข้าสู่ระบบ
          </Button>
          {/* <Box style={{ marginTop: "20px" }}>
            <Link
              style={{
                color: "#D9D9D9",
                marginTop: "30px",
                marginRight: "20px",
              }}
              to="/forget/toemail"
            >
              ลืม/เปลี่ยนรหัสผ่าน
            </Link>

            <Link style={{ color: "#D9D9D9", marginTop: "30px" }} to="/Actived">
              ยืนยันตัวตน
            </Link>
          </Box> */}
        </Stack>
      </Container>
      <Box>
        <Footer />
      </Box>
    </BoxCard>
  );
}
