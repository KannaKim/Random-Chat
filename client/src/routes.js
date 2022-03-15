import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import App from "./App";
const CustomRoutes = ()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>}></Route>
      </Routes>
    </Router>
  );
}
export default CustomRoutes