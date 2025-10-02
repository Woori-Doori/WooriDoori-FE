import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "@/App";
import { ThemeProvider } from "styled-components";
import React from "react";
import Calendar from "./pages/Calender";

const theme = {
  colors: {
    primary: "#3498db",
    secondary: "#e74c3c",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
            <Route path="/calendar" element={<Calendar/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
