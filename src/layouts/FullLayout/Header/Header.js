import React from "react";

import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

import Typography from "@mui/material/Typography";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Button,
  Avatar,
  Stack,
  useMediaQuery,
  Paper,
} from "@material-ui/core";

const Header = (props) => {
  // 4
  const [setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const headerContent = (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={props.toggleMobileSidebar}
        sx={{
          display: {
            lg: "none",
            xs: "inline",
          },
        }}
      >
        <MenuOutlinedIcon width="20" height="20" />
      </IconButton>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ position: "absolute", left: "36%" }}
      >
        <Typography variant="h3" align="center" m="auto" alignItems={"center"}>
          Graduation Requirements System
        </Typography>
        <Typography variant="h4">ระบบตรวจสอบการจบการศึกษา</Typography>
      </Stack>
      <Box flexGrow={1} />

      <Box
        sx={{
          width: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          height: "25px",
          ml: 1,
        }}
      ></Box>

      {(() => {
        if (lgUp) {
          return (
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Stack>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "40px",
                      height: "40px",
                      marginRight: "5px",
                    }}
                  />
                </Box>
              </Stack>
            </Button>
          );
        } else {
          return (
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: "40px",
                    height: "40px",
                    marginRight: "5px",
                  }}
                />
              </Box>
            </Button>
          );
        }
      })()}
    </Toolbar>
  );
  if (lgUp) {
    return (
      <div>
        <AppBar sx={props.sx} elevation={0}>
          {headerContent}
        </AppBar>
      </div>
    );
  }
  return (
    <AppBar sx={props.sx} elevation={0}>
      {headerContent}
      <Paper
        elevation={9}
        sx={{
          backgroundColor: "#85888e",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderRadius: "0",
        }}
      ></Paper>
    </AppBar>
  );
};

export default Header;
