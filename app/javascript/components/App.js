import React from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";


const App = () => {
  return(
    <>
      <BrowserRouter>
        <nav className="p-4 bg-gray-200 flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
)};

export default App;  