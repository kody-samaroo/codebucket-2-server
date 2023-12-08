const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "blue",
    database: "codebucket",
    port: 9000
});

// db.connect((error) => {
//     if (error) {
//       console.error('Error connecting to MySQL database:', error);
//     } else {
//       console.log('Connected to MySQL database!');
//     }
//   });


// GET ALL PROJECTS
app.get("/projects", (req,res)=> {
    const q = "SELECT * FROM projects"
    db.query(q, (err,data)=> {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// CREATE PROJECT
app.post("/projects", (req,res) => {
    const q = "INSERT INTO projects (`project_id`, `title`, `author`, `html`, `css`, `js`) VALUES (?)"
    const values = [
        req.body.project_id,
        req.body.title,
        req.body.author,
        req.body.html,
        req.body.css,
        req.body.js
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Project has been added");
    })
})


// DELETE PROJECT 
app.delete("/projects/:id", (req,res) => {
    const q = "DELETE FROM projects WHERE project_id = ?";

    const value = req.params.id

    db.query(q, value, (err, data) => {
        return res.json("Project has been deleted");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend");
});