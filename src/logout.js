import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  props.setToken("");
  props.setUser("");
  localStorage.clear();
  console.log("LogOut");
  navigate("/home");
};

export default Logout;
