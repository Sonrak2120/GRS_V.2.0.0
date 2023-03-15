import React, { useState, useCallback } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { baseTheme } from "./assets/global/Theme-variable";
import { Navigate } from "react-router-dom";

import FullLayoutTeacher from "./layouts/FullLayout/Sidebar/FullLayoutTeacher";

//////////////////////////////////////////Admin

import UploadHtmlNew from "./uplaod/UploadHtmlNew";

//////////////////////////////////////////Teacher
import DataStu from "./views/Teacher/DataStu";

const App = () => {
  const [role] = useState(
    sessionStorage.getItem("role") ? sessionStorage.getItem("role") : ""
  );

  const TeacherRoute = [
    {
      path: "/",
      element: <FullLayoutTeacher />,
      children: [
        { path: "/", element: <Navigate to="/teacher" /> },
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
    if (role === "teacher") {
      return TeacherRoute;
    } else if (role === "teacher") {
      return TeacherRoute;
    } else return TeacherRoute;
  }, [role]);

  const routing = useRoutes(switchRoute());
  const theme = baseTheme;

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};

export default App;
