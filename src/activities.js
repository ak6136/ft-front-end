import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

const Activities = (props) => {
  const [name, setName] = useState("");
  //   const [goal, setGoal] = useState("");
  const [activities, setActivities] = useState([]);
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");

  const params = useParams();

  const fetchActivities = async () => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities`
    );
    const data = await response.json();
    // console.log(data);
    if (data) {
      setActivities(data);
    }
  };

  const postActivities = async (event) => {
    console.log(props.token);
    event.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            name: name,
            description: description,
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
    fetchActivities();
  }, []);

  return (
    <div>
      <form onSubmit={postActivities}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of activity"
        />
        <input
          value={goal}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
        <button>Create activity</button>
      </form>
      <ul className="All activities">
        {activities.map((activity) => {
          console.log(activity);
          return (
            <div
              key={activity.id}
              style={{ border: "1px solid black" }}
              className="activity"
            >
              <p>{activity.name}</p>
              <p>{activity.description}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Activities;
