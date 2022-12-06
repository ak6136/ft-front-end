import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState({});

  const navigate = useNavigate();

  //   const params = useParams();

  //   const fetchRoutines = async () => {
  //     const response = await fetch(
  //       `http://fitnesstrac-kr.herokuapp.com/api/routines`
  //     );
  //     const data = await response.json();
  //     if (data) {
  //       setRoutines(data.routines);
  //     }
  //   };

  const postRoutine = async (event) => {
    console.log(props.token);
    event.preventDefault();
    try {
      //   const url = `http://fitnesstrac-kr.herokuapp.com/api/routines`;
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            name: name,
            goal: goal,
            isPublic: true,
          }),
        }
      );
      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  const postActivitytoRoutine = async (event) => {
    console.log(props.token);
    event.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines/:routineId/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            count: count,
            duration: duration,
          }),
        }
      );
      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoutinesbyUsername = async (event) => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/:username/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      setSelectedRoutine(data);
    }
  };

  const editRoutine = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines/:routineId`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            name: name,
            goal: goal,
            isPublic: true,
          }),
        }
      );
      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoutine = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines/:routineId`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.log("Error with deleting routine");
    }
  };

  const deleteActivityRoutine = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines/:routineId/activities`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.log("Error with deleting activity routine");
    }
  };

  useEffect(() => {
    getRoutinesbyUsername();
  }, []);

  return (
    <div>
      <form onSubmit={postRoutine}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of routine"
        />
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Your Goal"
        />
        <button>Create routine</button>
      </form>
      <ul>
        <div className="routines associated with user">
          <table>
            <tbody>
              <tr>
                <td>
                  <select
                    onChange={(event) => {
                      setSelectedRoutine(event.target.value);
                      navigate(`/editRoutines`);
                    }}
                  >
                    <option>No Routines Selected</option>
                    {routines.map((routine) => {
                      // console.log(user);
                      return <option>{routine.name}</option>;
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ul>
      {/* <form onSubmit={editRoutine}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of routine"
        />
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Your Goal"
        />
        <button>Create routine</button>
      </form>
      <form onSubmit={postActivitytoRoutine}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of activity to routine"
        />
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Name of goal"
        />
        <input
          value={count}
          onChange={(event) => setCount(event.target.value)}
          placeholder="Count"
        />
        <input
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          placeholder="Duration"
        />
        <button>Add activity to routine</button>
        <button onClick={(event) => deleteActivityRoutine}>
          Delete activity to routine
        </button>
      </form> */}
    </div>
  );
};

export default MyRoutines;
