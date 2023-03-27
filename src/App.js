import React, { useState, useCallback } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { baseTheme } from "./assets/global/Theme-variable";
import { Navigate } from "react-router-dom";

import FullLayoutTeacher from "./layouts/FullLayout/Sidebar/FullLayoutTeacher";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Error from "./routes/Error";

//////////////////////////////////////////Admin

import UploadHtmlNew from "./uplaod/UploadHtmlNew";

//////////////////////////////////////////Teacher
import DataStu from "./views/Teacher/DataStu";

////////////////////////////////////
import LoginPage from "./views/Login/LoginPage";

const App = () => {
  const [role, SetRole] = useState(
    sessionStorage.getItem("role") ? sessionStorage.getItem("role") : ""
  );

  const loginRoute = [
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/loginpage" /> },
        // { path: "404", element: <Error /> },
        { path: "*", element: <Navigate to="/loginpage" /> },
      ],
    },
    {
      path: "/loginpage",
      element: <LoginPage SetRole={SetRole} />,
    },
  ];

  const TeacherRoute = [
    {
      path: "/teacher",
      element: <FullLayoutTeacher />,
      children: [
        { path: "/teacher", element: <DataStu /> },

        { path: "/teacher/updatehtml", element: <UploadHtmlNew /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ];

  const switchRoute = useCallback(() => {
    if (role === "admin") {
      return TeacherRoute;
    } else return loginRoute;

    //else return loginRoute;
  }, [role]);

  const routing = useRoutes(switchRoute());
  const theme = baseTheme;

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};

export default App;
