import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "db5011110027.hosting-data.io",
    database: "dbs9386417",
    user: "dbu4883651",
    password: "#!$bhtmysqldb",
    port: 3306
});

app.get("/", (req, res) => {
    res.json(
        "BHT WiS3 2022-2023 - Datenbanksysteme ---- Hello, this is the backend."
    );
});

app.get("/platform", (req, res) => {
    const platq = "SELECT * FROM platform";
    db.query(platq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/publisher", (req, res) => {
    const pubq = "SELECT * FROM publisher";
    db.query(pubq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("Connection to backend established!");
});
