import React from "react";
import { Link } from "react-router-dom";
import { Box, Drawer, useMediaQuery } from "@material-ui/core";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import logo from "../../../assets/images/logo.png";

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const SidebarContent = (
    <Box
      sx={{
        p: 0,
        height: "calc(100vh)",
        backgroundColor: "#2f3337",
        color: "white",
        "& .MuiListItemIcon-root": { color: "white" },
      }}
    >
      <Link to="/">
        <Box
          sx={{ display: "flex", alignItems: "Center", ml: "80px", mt: "20px" }}
        >
          <Box
            component="img"
            src={logo}
            sx={{ maxWidth: "80px", alignItems: "center" }}
          />
        </Box>
      </Link>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
