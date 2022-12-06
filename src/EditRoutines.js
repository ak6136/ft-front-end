import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

const EditRoutine = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [editcount, setEditCount] = useState("");
  const [editduration, setEditDuration] = useState("");
  const [routines, setRoutines] = useState("");

  const params = useParams();

  const fetchActivitiestoRoutines = async (event) => {};

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
          }),
        }
      );
      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  const editActivityRoutine = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/routineActivityId`,
        {
          method: "PATCH",
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
    fetchActivitiestoRoutines();
  }, []);

  return (
    <div>
      <form onSubmit={editRoutine}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of edited routine"
        />
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Edited Goal"
        />
      </form>
      <button>Edit routine</button>
      <button onClick={(event) => deleteRoutine(event)}>Delete routine</button>
      <form onSubmit={editActivityRoutine}>
        <input
          value={editcount}
          onChange={(event) => setEditCount(event.target.value)}
          placeholder="New count"
        />
        <input
          value={editduration}
          onChange={(event) => setEditDuration(event.target.value)}
          placeholder="New duration"
        />
      </form>
      <button>Edit activity with routine</button>
      <form onSubmit={postActivitytoRoutine}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of activity to routine"
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
      </form>
    </div>
  );
};

export default EditRoutine;
