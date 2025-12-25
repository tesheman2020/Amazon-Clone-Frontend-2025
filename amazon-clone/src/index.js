import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DataProvider  from "./Components/DataProvider/DataProvider";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <DataProvider>
        <App />
      </DataProvider>
    </HashRouter>
  </React.StrictMode>
);



