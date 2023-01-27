import express from "express";
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
    host: "bhtdb.chxlf7lsw2kg.eu-central-1.rds.amazonaws.com",
    database: "bhtdb",
    user: "admin",
    password: "#!$mybhtdb",
    port: 3306
});

app.get("/", (req, res) => {
    res.json(
        "BHT WiS3 2022-2023 - Datenbanksysteme ---- Hello, this is the backend."
    );
});

// access to platform table
app.get("/platform", (req, res) => {
    const platq = "SELECT * FROM platform";
    db.query(platq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// access to publisher table
app.get("/publisher", (req, res) => {
    const platq = "SELECT * FROM publisher";
    db.query(platq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// acess to video games table
app.get("/videogames", (req,res) =>  {
    const videoq = "SELECT * from videogames LEFT JOIN platform on videogames.platform=platform.pId LIMIT 5";
    db.query(videoq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/q1", (req, res) => {
    const q1 = "SELECT videogames.title AS game, COUNT(*) AS count FROM videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE '%' || videogames.title || '%' GROUP BY videogames.title LIMIT 10"
    db.query(q1, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/q5", (req, res) => {
    const q5 = "SELECT platform.pId, CONCAT(hersteller, ' ', name) as platform, COUNT(*) AS count from platform, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('% ', platform.name, '%') GROUP BY name ORDER BY count DESC"
    db.query(q5, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Connection to backend established on port ${PORT}`));
