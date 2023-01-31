import express from "express";
import mysql from "mysql2";

const app = express();
const port = process.env.PORT || 3000;

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

// access to aol querydata table
app.get("/querydata", (req, res) => {
    const querydataq = "SELECT * FROM QUERYDATA WHERE ITEMRANK IS NOT NULL AND CLICKURL IS NOT NULL LIMIT 5"
    db.query(querydataq, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

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

// access to video games table
app.get("/videogames", (req,res) =>  {
    const videoq = "SELECT * from videogames LEFT JOIN platform on videogames.platform=platform.pId LIMIT 5";
    db.query(videoq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// question 1
app.get("/q1", (req, res) => {
    const q1 = "SELECT videogames.gId, videogames.title as game, COUNT(*) AS count from videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('% ', videogames.title, '%') GROUP BY videogames.title ORDER BY count DESC LIMIT 10"
    db.query(q1, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 2
app.get("/q2", (req, res) => {
    const q2 = "SELECT videogames.genre, count(*) as count from QUERYDATA inner join videogames on QUERYDATA.QUERY LIKE concat('% ', REPLACE(videogames.title, 'The ', ''),' %') GROUP BY videogames.genre order by count desc"
    db.query(q2, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 3
app.get("/q3", (req, res) => {
    const q3 = "SELECT videogames.max_players, count(*) as count from videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, ' %') OR QUERYDATA.QUERY LIKE videogames.title GROUP BY videogames.max_players ORDER BY count desc"
    db.query(q3, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 4

// question 5
app.get("/q5", (req, res) => {
    const q5 = "SELECT platform.pId, CONCAT(hersteller, ' ', name) as platform, COUNT(*) AS count from platform, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('% ', platform.name, '%') GROUP BY name ORDER BY count DESC"
    db.query(q5, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 6
app.get("/q6", (req, res) => {
    const q6 = ""                       // add missing query
    db.query(q6, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 7
app.get("/q7", (req, res) => {
    const q7 = ""                       // add missing query
    db.query(q7, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 8
app.get("/q8", (req, res) => {
    const q8 = "SELECT videogames.gId, videogames.title as game, count(*) as count from videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, '%') AND QUERYDATA.QUERY LIKE CONCAT('%', 'cheat', '%') GROUP BY videogames.title ORDER BY count desc LIMIT 10"
    db.query(q8, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 9
app.get("/q9", (req, res) => {
    const q9 = ""                       // add missing query
    db.query(q9, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// question 10
app.get("/q10", (req, res) => {
    const q10 = ""                       // add missing query
    db.query(q10, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(port, () => console.log(`Connection to backend established on port ${port}`));
