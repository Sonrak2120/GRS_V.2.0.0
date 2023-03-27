import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Spinner from "./views/Spinner/Spinner";

//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <BrowserRouter basename="pcr">
      <App />
    </BrowserRouter>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
