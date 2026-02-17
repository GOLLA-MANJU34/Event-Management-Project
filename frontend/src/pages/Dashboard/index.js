import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./index.css";

function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");

        setEvents(res.data);
      } catch {
        alert("Failed to fetch dashboard");
      }
    };

    fetchDashboard();
  }, [navigate]);

  const today = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.datetime) >= today
  );

  const pastEvents = events.filter((event) => new Date(event.datetime) < today);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Dashboard</h2>

      <h3 className="section-title">Upcoming Events</h3>

      {upcomingEvents.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        upcomingEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h4>{event.name}</h4>

            <p>Location: {event.location}</p>

            <p>Date: {event.datetime}</p>
          </div>
        ))
      )}

      <h3 className="section-title">Past Events</h3>

      {pastEvents.length === 0 ? (
        <p>No past events</p>
      ) : (
        pastEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h4>{event.name}</h4>

            <p>Location: {event.location}</p>

            <p>Date: {event.datetime}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
