import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./App";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const userLogin = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const info = await response.json();
    console.log(info);
    if (!info.user) {
      setError(info.error);
    } else {
      setToken(info.token);
      localStorage.setItem("token", info.token);
      navigate("/profile");
    }
  };
  return (
    <div>
      <form onSubmit={userLogin}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="username"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={"password"}
          type={"password"}
        />
        <button>Login</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Login;
