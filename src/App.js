import "./App.css";
import {
  Home,
  Login,
  Register,
  Routine,
  Activities,
  NavBar,
  Profile,
  Logout,
  MyRoutines,
} from "./index";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

export const API = "https://fitnesstrac-kr.herokuapp.com/";

function App() {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [routine, setRoutine] = useState({});
  const [activity, setActivity] = useState({});

  const fetchRoutines = async () => {
    const response = await fetch(`${API}/routines`);
    const info = await response.json();
    if (info.success) {
      setRoutines(info.data.routines);
    }
  };

  const fetchActivities = async () => {
    const response = await fetch(`${API}/activities`);
    const info = await response.json();
    if (info.success) {
      setActivities(info.data.activities);
    }
  };

  const fetchUser = async () => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (!token) {
      return;
    }

    const response = await fetch(
      "https://fitnesstrac-kr.herokuapp.com/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const info = await response.json();
    if (info.success) {
      setUser(info.data);
    }
  };

  useEffect(() => {
    fetchActivities(token, setActivities);
    fetchRoutines(token, setRoutines);
    fetchUser(token, setToken, setUser);
  }, [token]);

  return (
    <div>
      <NavBar token={token} setToken={setToken} user={user} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/routines"
          element={
            <Routine
              routine={routine}
              routines={routines}
              token={token}
              fetchRoutines={fetchRoutines}
            />
          }
        />
        <Route
          path="/routines/:routinesId/*"
          element={<Routine routines={routines} token={token} />}
        />
        <Route
          path="/activities"
          element={
            <Activities
              activity={activity}
              activities={activities}
              token={token}
              fetchActivities={fetchActivities}
            />
          }
        />
        <Route
          path="/myroutines"
          element={
            <MyRoutines
              routines={routines}
              // activity={activity}
              // activities={activities}
              token={token}
              // fetchActivities={fetchActivities}
            />
          }
        />
        <Route
          path="/activities/:activitiesId/*"
          element={<Activities activities={activities} token={token} />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/logout"
          element={<Logout setToken={setToken} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
