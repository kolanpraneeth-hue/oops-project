import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const API = "http://localhost:5000/api";

function App() {
    const [user, setUser] = useState(null);
    const [register, setRegister] = useState(false);
    const [page, setPage] = useState("dashboard");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [attendance, setAttendance] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [notices, setNotices] = useState([]);
    const [events, setEvents] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [complaints, setComplaints] = useState([]);

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    async function handleAuth(e) {
        e.preventDefault();

        const url = register
            ? `${API}/register`
            : `${API}/login`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        if (register) {
            alert("Registration successful!");
            setRegister(false);
            setName("");
        } else {
            setUser(data.user);
            loadData(data.user.id);
        }
    }

    async function loadData(id) {
        const attendanceData =
            await fetch(`${API}/attendance/${id}`);

        const timetableData =
            await fetch(`${API}/timetable`);

        const noticesData =
            await fetch(`${API}/notices`);

        const eventsData =
            await fetch(`${API}/events`);

        const facilitiesData =
            await fetch(`${API}/facilities`);

        const complaintsData =
            await fetch(`${API}/complaints/${id}`);

        setAttendance(await attendanceData.json());
        setTimetable(await timetableData.json());
        setNotices(await noticesData.json());
        setEvents(await eventsData.json());
        setFacilities(await facilitiesData.json());
        setComplaints(await complaintsData.json());
    }

    async function submitComplaint(e) {
        e.preventDefault();

        const response = await fetch(
            `${API}/complaints`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    student_id: user.id,
                    subject,
                    description
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            setSubject("");
            setDescription("");
            loadData(user.id);
        }
    }

    if (!user) {
        return (
            <div className="login-page">
                <div className="login-box">

                    <h1>CampusConnect</h1>

                    <p>
                        Smart Campus Management System
                    </p>

                    <h2>
                        {register
                            ? "Student Registration"
                            : "Student Login"}
                    </h2>

                    <form onSubmit={handleAuth}>

                        {register && (
                            <input
                                placeholder="Full Name"
                                value={name}
                                onChange={e =>
                                    setName(e.target.value)
                                }
                                required
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button>
                            {register
                                ? "Create Account"
                                : "Login"}
                        </button>

                    </form>

                    <button
                        className="switch"
                        onClick={() =>
                            setRegister(!register)
                        }
                    >
                        {register
                            ? "Already registered? Login"
                            : "New student? Register"}
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div>

            <header>
                <h1>CampusConnect</h1>

                <p>
                    Welcome, {user.name}
                </p>

                <button
                    onClick={() => setUser(null)}
                >
                    Logout
                </button>
            </header>

            <nav>

                <button onClick={() => setPage("dashboard")}>
                    Dashboard
                </button>

                <button onClick={() => setPage("attendance")}>
                    Attendance
                </button>

                <button onClick={() => setPage("timetable")}>
                    Timetable
                </button>

                <button onClick={() => setPage("notices")}>
                    Notices
                </button>

                <button onClick={() => setPage("events")}>
                    Events
                </button>

                <button onClick={() => setPage("campus")}>
                    Campus
                </button>

                <button onClick={() => setPage("complaints")}>
                    Complaints
                </button>

            </nav>

            <main>

                {page === "dashboard" && (
                    <>
                        <h2>Student Dashboard</h2>

                        <div className="cards">

                            <div className="card">
                                <h3>Attendance</h3>
                                <p>
                                    Track your attendance.
                                </p>
                            </div>

                            <div className="card">
                                <h3>Timetable</h3>
                                <p>
                                    View your classes.
                                </p>
                            </div>

                            <div className="card">
                                <h3>Notices</h3>
                                <p>
                                    Important announcements.
                                </p>
                            </div>

                            <div className="card">
                                <h3>Events</h3>
                                <p>
                                    Upcoming campus events.
                                </p>
                            </div>

                            <div className="card">
                                <h3>Complaints</h3>
                                <p>
                                    Submit and track complaints.
                                </p>
                            </div>

                        </div>
                    </>
                )}

                {page === "attendance" && (
                    <>
                        <h2>Attendance</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Total</th>
                                    <th>Attended</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>

                            <tbody>
                                {attendance.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.subject}</td>
                                        <td>{item.total}</td>
                                        <td>{item.attended}</td>
                                        <td>
                                            {(
                                                item.attended /
                                                item.total *
                                                100
                                            ).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {page === "timetable" && (
                    <>
                        <h2>Timetable</h2>

                        {timetable.map((item, i) => (
                            <div className="card" key={i}>
                                <h3>{item.subject}</h3>
                                <p>
                                    {item.day} | {item.time}
                                </p>
                                <p>
                                    {item.room}
                                </p>
                            </div>
                        ))}
                    </>
                )}

                {page === "notices" && (
                    <>
                        <h2>Campus Notices</h2>

                        {notices.map(notice => (
                            <div className="card" key={notice.id}>
                                <h3>{notice.title}</h3>
                                <p>
                                    {notice.description}
                                </p>
                            </div>
                        ))}
                    </>
                )}

                {page === "events" && (
                    <>
                        <h2>Campus Events</h2>

                        {events.map(event => (
                            <div className="card" key={event.id}>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p>
                                    Date: {event.date}
                                </p>
                                <p>
                                    Location: {event.location}
                                </p>
                            </div>
                        ))}
                    </>
                )}

                {page === "campus" && (
                    <>
                        <h2>Campus Facilities</h2>

                        <div className="cards">

                            {facilities.map(facility => (
                                <div
                                    className="card"
                                    key={facility.id}
                                >
                                    <h3>
                                        {facility.name}
                                    </h3>

                                    <p>
                                        Location:
                                        {" "}
                                        {facility.location}
                                    </p>

                                    <p>
                                        {facility.description}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </>
                )}

                {page === "complaints" && (
                    <>
                        <h2>Complaints & Feedback</h2>

                        <form
                            className="complaint-form"
                            onSubmit={submitComplaint}
                        >
                            <input
                                placeholder="Complaint subject"
                                value={subject}
                                onChange={e =>
                                    setSubject(e.target.value)
                                }
                                required
                            />

                            <textarea
                                placeholder="Describe your complaint"
                                value={description}
                                onChange={e =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <button>
                                Submit Complaint
                            </button>
                        </form>

                        <h3>Your Complaints</h3>

                        {complaints.map(complaint => (
                            <div
                                className="card"
                                key={complaint.id}
                            >
                                <h3>
                                    {complaint.subject}
                                </h3>

                                <p>
                                    {complaint.description}
                                </p>

                                <strong>
                                    Status: {complaint.status}
                                </strong>
                            </div>
                        ))}
                    </>
                )}

            </main>
        </div>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
