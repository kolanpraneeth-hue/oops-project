const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

let users = [];

let attendance = [
    {
        student_id: 1,
        subject: "Data Structures",
        total: 40,
        attended: 36
    },
    {
        student_id: 1,
        subject: "Database Systems",
        total: 35,
        attended: 30
    },
    {
        student_id: 1,
        subject: "Operating Systems",
        total: 30,
        attended: 27
    }
];

const timetable = [
    {
        day: "Monday",
        subject: "Data Structures",
        time: "09:00 - 10:00",
        room: "Room 101"
    },
    {
        day: "Monday",
        subject: "Database Systems",
        time: "10:00 - 11:00",
        room: "Room 102"
    },
    {
        day: "Tuesday",
        subject: "Operating Systems",
        time: "09:00 - 10:00",
        room: "Room 201"
    },
    {
        day: "Wednesday",
        subject: "Computer Networks",
        time: "11:00 - 12:00",
        room: "Room 203"
    },
    {
        day: "Thursday",
        subject: "Machine Learning",
        time: "10:00 - 11:00",
        room: "Lab 2"
    }
];

const notices = [
    {
        id: 1,
        title: "Mid Semester Examination",
        description: "Mid semester examinations will begin next month."
    },
    {
        id: 2,
        title: "Attendance Notice",
        description: "Students must maintain the required attendance."
    },
    {
        id: 3,
        title: "Campus Maintenance",
        description: "Library maintenance will be conducted this weekend."
    }
];

const events = [
    {
        id: 1,
        title: "Technical Symposium",
        description: "Annual technical symposium.",
        date: "10 October 2026",
        location: "Main Auditorium"
    },
    {
        id: 2,
        title: "Hackathon",
        description: "24-hour student coding hackathon.",
        date: "20 October 2026",
        location: "Innovation Lab"
    },
    {
        id: 3,
        title: "Sports Day",
        description: "Annual college sports event.",
        date: "5 November 2026",
        location: "College Ground"
    }
];

const facilities = [
    {
        id: 1,
        name: "Library",
        location: "Block A - Ground Floor",
        description: "Central college library"
    },
    {
        id: 2,
        name: "Computer Lab",
        location: "Block B - First Floor",
        description: "Computer laboratory"
    },
    {
        id: 3,
        name: "Cafeteria",
        location: "Block C - Ground Floor",
        description: "Student cafeteria"
    },
    {
        id: 4,
        name: "Main Auditorium",
        location: "Block A - Second Floor",
        description: "College auditorium"
    }
];

let complaints = [];

app.get("/", (req, res) => {
    res.json({
        message: "CampusConnect API is running"
    });
});

app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered"
        });
    }

    const user = {
        id: users.length + 1,
        name,
        email,
        password,
        role: "student"
    };

    users.push(user);

    res.json({
        message: "Registration successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

app.get("/api/attendance/:id", (req, res) => {
    const studentId = Number(req.params.id);

    res.json(
        attendance.filter(
            item => item.student_id === studentId
        )
    );
});

app.get("/api/timetable", (req, res) => {
    res.json(timetable);
});

app.get("/api/notices", (req, res) => {
    res.json(notices);
});

app.get("/api/events", (req, res) => {
    res.json(events);
});

app.get("/api/facilities", (req, res) => {
    res.json(facilities);
});

app.post("/api/complaints", (req, res) => {
    const { student_id, subject, description } = req.body;

    if (!student_id || !subject || !description) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const complaint = {
        id: complaints.length + 1,
        student_id,
        subject,
        description,
        status: "Pending"
    };

    complaints.push(complaint);

    res.json({
        message: "Complaint submitted successfully",
        complaint
    });
});

app.get("/api/complaints/:id", (req, res) => {
    const studentId = Number(req.params.id);

    res.json(
        complaints.filter(
            complaint => complaint.student_id === studentId
        )
    );
});

app.listen(PORT, () => {
    console.log(`CampusConnect server running at http://localhost:${PORT}`);
});
