import { createTheme } from "@material-ui/core/styles";
import typography from "./Typography";
import shadows from "./Shadows";

// ##############################

// // // Global Variables
// ##############################

const SidebarWidth = 265;
const TopbarHeight = 70;

const baseTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#02BC77",
      light: "#e6f4ff",
    },
    primary2: {
      main: "rgba(255,255,255,0.7)",
      light: "#e6f4ff",
    },
    primary3: {
      main: "#ffff",
    },
    secondary: {
      main: "#1e4db7",
    },
    background: {
      default: "#56525247",
    },
    success: {
      main: "#39cb7f",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#fc4b6c",
    },
    error: {
      main: "#fc4b6c",
    },
    warning: {
      main: "#fdd43f",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
  },
  shape: {
    borderRadius: 5,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        "#root": {
          height: "100%",
        },
      },
    },
    // MuiContainer: {
    //   styleOverrides: {
    //     root: {
    //       paddingLeft: "15px !important",
    //       paddingRight: "15px !important",
    //       maxWidth: "1600px",
    //     },
    //   },
    // },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "14px",
          margin: "15px",
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "40px",
        },
      },
    },

    MuiGridItem: {
      styleOverrides: {
        root: {
          paddingTop: "30px",
          paddingLeft: "30px !important",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1700,
      pm: 500,
    },
  },

  mixins: {
    toolbar: {
      color: "#ffffff",
      "@media(min-width:1280px)": {
        minHeight: TopbarHeight,
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  status: {
    danger: "#e53e3e",
  },
  typography,
  shadows,
});

export { TopbarHeight, SidebarWidth, baseTheme };
