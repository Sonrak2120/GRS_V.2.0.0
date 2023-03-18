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
import Progess from "../../layouts/FullLayout/Sidebar/Progess";

const BoxCard = styled(Box)(({ them }) => ({
  backgroundColor: "#343434",
  minHeight: "100vh",
}));

export default function SentToForget() {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [email, setemail] = useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    const headerlist = {
      Accept: "*/*",
    };
    try {
      const resp = await axios.patch(
        "http://localhost:5000/forget-password-get-email",
        {
          email: email,
        },
        {}
      );
      if (resp.data.message === "success") {
        setLoading(false);
        alert("กรุณาตรวจสอบอีเมล");
        window.location.assign("/");
      } else if (resp.data.message === "not found") {
        setLoading(false);
        alert("ไม่พบบัญชีหรือยังไม่ยืนยันตัวตน");
      } else {
        alert("มีข้อผิดพลาด");
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

  // const [password, setpassword] = useState("");
  // return (
  //   <div className="products">
  //     <Box>
  //       <Stack spacing={2} justifyContent="center" alignItems={"center"}>
  //         <Stack
  //           direction={{ xs: "column", sm: "row" }}
  //           spacing={{ xs: 1, sm: 2, md: 2 }}
  //           sx={{ mt: 5 }}
  //         >
  //           <Inputnew
  //             sx={{ width: "450px" }}
  //             id="email"
  //             label="E-mail"
  //             onChange={(e) => setemail(e.target.value)}
  //           />
  //         </Stack>
  //       </Stack>
  //       <Button
  //         type="submit"
  //         variant="contained"
  //         sx={{ backgroundColor: "#D9D9D9", color: "black", width: "150px" }}
  //         onClick={handleSubmit}
  //       >
  //         ส่งอีเมล
  //       </Button>
  //     </Box>
  //   </div>
  // );
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
            mt="5rem!important"
            mb="2rem!important"
          />
          <Typography variant="h4" color={"white"}>
            Graduation Requirements System
          </Typography>
          <Typography variant="h3" color={"white"}>
            เปลี่ยนรหัสผ่าน
          </Typography>
          <Typography
            variant="h6"
            mt="1rem!important"
            color={"rgba(255,255,255,0.7)"}
          >
            กรุณาใส่ E-Mail เพื่อเปลี่ยนรหัสผ่าน
          </Typography>
          <Inputnew
            sx={{ width: "450px" }}
            required
            id="email"
            placeholder="E-mail"
            autoComplete="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#D9D9D9", color: "black", width: "150px" }}
            onClick={handleSubmit}
          >
            ส่งอีเมล
          </Button>
        </Stack>
      </Container>
      <Box style={{ marginTop: "10%" }}>
        <Footer />
      </Box>
    </BoxCard>
  );
}
