import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { SidebarWidth } from "../../assets/global/Theme-variable";
import MenuitemTeacher from "./DataTeacher";
import logo from "../../assets/images/logo.png";

const SidebarTeacher = (props) => {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

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
      <Link to="/teacher">
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

      <Box>
        <List
          sx={{
            mt: 2,
          }}
        >
          {MenuitemTeacher.map((item, index) => {
            //{/********SubHeader**********/}

            return (
              <List component="li" disablePadding key={item.title}>
                <Link underline="none">
                  <ListItem
                    onClick={() => handleClick(index)}
                    button
                    component={NavLink}
                    to={item.href}
                    selected={pathDirect === item.href}
                    sx={{
                      mb: 1,
                      color: "white",
                      ...(pathDirect === item.href && {
                        color: "white",

                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ...(pathDirect === item.href && { color: "white" }),
                      }}
                    >
                      <item.icon width="20" height="20" />
                    </ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                  </ListItem>
                </Link>
              </List>
            );
          })}
        </List>
      </Box>
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

export default SidebarTeacher;
