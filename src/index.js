import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import App from "./App";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <HashRouter>/
    <ScrollToTop />
    <App />
  </HashRouter>,
  document.getElementById("root")
);
