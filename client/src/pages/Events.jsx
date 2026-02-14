import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/search")
      .then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h2>Events</h2>

      {events.map((e) => (
        <div key={e._id}>
          <h4>{e.name}</h4>
          <p>{e.location}</p>
        </div>
      ))}
    </div>
  );
}
