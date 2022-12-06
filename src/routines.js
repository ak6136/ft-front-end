import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

const Routine = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [routines, setRoutines] = useState([]);

  const params = useParams();

  const fetchRoutines = async () => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines`
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      setRoutines(data);
    }
  };

  const postRoutine = async (event) => {
    console.log(props.token);
    event.preventDefault();
    try {
      const url = `http://fitnesstrac-kr.herokuapp.com/api/routines`;
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

  useEffect(() => {
    fetchRoutines();
  }, []);

  console.log(routines);
  return (
    <div>
      {/* <form onSubmit={postRoutine}>
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
      <form onSubmit={editRoutine}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of new routine"
        />
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Name of new goal"
        />
        <button>Create routine</button>
      </form> */}
      <ul className="All routines">
        {routines.map((routine) => {
          return (
            <div key={routine.id} className="routine">
              <p>{routine.name}</p>
              <p>{routine.goal}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Routine;
