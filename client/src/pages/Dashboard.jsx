import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!auth?.token) return;

    axios
      .get("http://localhost:5000/api/registrations/me", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => setItems(res.data));
  }, [auth]);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();

    const upcoming = [];
    const past = [];

    items.forEach((r) => {
      const d = new Date(r.event.date);
      d > now ? upcoming.push(r) : past.push(r);
    });

    return { upcoming, past };
  }, [items]);

  return (
    <div>
      <h2>My Events</h2>

      <h3>Upcoming</h3>
      {upcoming.map((r) => (
        <Card key={r._id} event={r.event} />
      ))}

      <h3>Past</h3>
      {past.map((r) => (
        <Card key={r._id} event={r.event} />
      ))}
    </div>
  );
}

function Card({ event }) {
  return (
    <div style={{ border: "1px solid #ddd", margin: 8, padding: 8 }}>
      <b>{event.name}</b>
      <div>{event.location}</div>
      <div>{new Date(event.date).toDateString()}</div>
    </div>
  );
}
