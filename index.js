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

// Access to AOL querydata table
app.get("/querydata", (req, res) => {
    const querydataq = "SELECT * FROM QUERYDATA WHERE ITEMRANK IS NOT NULL AND CLICKURL IS NOT NULL LIMIT 5"
    db.query(querydataq, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Access to platform table
app.get("/platform", (req, res) => {
    const platq = "SELECT * FROM platform";
    db.query(platq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Access to publisher table
app.get("/publisher", (req, res) => {
    const platq = "SELECT * FROM publisher";
    db.query(platq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Access to video games table
app.get("/videogames", (req,res) =>  {
    const videoq = "SELECT * from videogames LIMIT 10";
    db.query(videoq, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// Question 1
// Was waren die Top 10 Computerspiele?
app.get("/q1", (req, res) => {
    const q1 = "SELECT videogames.gId, videogames.title as game, COUNT(*) AS count from videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, '%') GROUP BY videogames.title ORDER BY count DESC LIMIT 10"
    db.query(q1, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 2
// Welche Genre waren am gefragtesten?
app.get("/q2", (req, res) => {
    const q2 = "SELECT videogames.genre, count(*) as count from QUERYDATA inner join videogames on QUERYDATA.QUERY LIKE concat('%', REPLACE(videogames.title, 'The ', ''),'%') GROUP BY videogames.genre order by count desc"
    db.query(q2, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 3
// Waren Solo oder Co-OP Spiele häufiger in den Suchanfragen?
app.get("/q3", (req, res) => {
    const q3 = "SELECT videogames.max_players, count(*) as count from videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, '%') GROUP BY videogames.max_players ORDER BY count desc"
    db.query(q3, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 4
// In welchem Land wurden die meisten der von uns untersuchten Spiele entwickelt?
app.get("/q4", (req, res) => {
    const q4 = "select publisher.sitz, count(*) as count from videogames left join publisher on videogames.publisher = publisher.pubId group by publisher.sitz order by count desc limit 10"
    db.query(q4, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 5
// Wie sah die Verteilung auf verschiedenen Plattformen aus?
app.get("/q5", (req, res) => {
    const q5 = "SELECT platform.pId, CONCAT(hersteller, ' ', name) as platform, COUNT(*) AS count from platform, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', platform.name, '%') GROUP BY name ORDER BY count DESC LIMIT 10"
    db.query(q5, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 6
// Welche Hersteller waren direkt am verbreitetsten in den Suchanfragen?
app.get("/q6", (req, res) => {
    const q6 = "SELECT publisher.name, count(*) AS count FROM publisher, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', publisher.name, '%') GROUP BY publisher.name ORDER BY count desc LIMIT 10"
    db.query(q6, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 7
// Welche Hersteller waren indirekt am verbreitetsten in den Suchanfragen?
app.get("/q7", (req, res) => {
    const q7 = "SELECT videogames.publisher, count(*) AS count FROM videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE concat('%', videogames.title, '%') GROUP BY videogames.publisher ORDER BY count DESC LIMIT 10"
    db.query(q7, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 8
// Welche Spiele verzeichnen eine Häufung an (oder gar keine) Suchen nach Cheatcodes?
app.get("/q8", (req, res) => {
    const q8 = "SELECT videogames.gId, videogames.title as game, count(*) as count from videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, '%') AND QUERYDATA.QUERY LIKE CONCAT('%', 'cheat', '%') GROUP BY videogames.title ORDER BY count desc LIMIT 10"
    db.query(q8, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 9
// Welche Websites wurden dafür frequentiert?
app.get("/q9", (req, res) => {
    const q9 = "SELECT QUERYDATA.CLICKURL, count(*) as count FROM videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, '%') AND QUERYDATA.QUERY LIKE CONCAT('%', 'cheat', '%') AND QUERYDATA.CLICKURL IS NOT NULL GROUP BY QUERYDATA.CLICKURL ORDER BY count DESC LIMIT 10"
    db.query(q9, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Question 10
// Was sind die am längsten bestehenden Entwickler der von uns untersuchten Spiele?
app.get("/q10", (req, res) => {
    const q10 = "select publisher.name, publisher.gruendung from publisher where publisher.aktiv LIKE 1 ORDER BY publisher.gruendung ASC LIMIT 10"
    db.query(q10, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Expose app to port
app.listen(port, () => console.log(`Connection to backend established on port ${port}`));
