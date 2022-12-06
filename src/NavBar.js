import React from "react";
import { Link } from "react-router-dom";

const LogOut = (props) => {
  props.setToken("");
  props.setUser("");
  localStorage.clear();
  console.log("LogOut");
};

const NavBar = ({ token }) => {
  return (
    <nav>
      <h1>Fitness Tracker</h1>
      <Link to="/home">Home</Link>
      <Link to="/routines">Routines</Link>
      <Link to="/activities">Activities</Link>
      <Link to="/myroutines">My Routines</Link>
      <Link to="/login">Login</Link>
      {!token && <Link to="/register">Register</Link>}
      <Link to="/profile">Profile</Link>
      <Link to={"/logout"} onClick={LogOut}>
        Log Out
      </Link>
    </nav>
  );
};

export default NavBar;
