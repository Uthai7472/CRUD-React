const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "uudsobokn10qlhot",
  password: "THzmqxf6MZIKt2G3EQDB",
  host: "bimchf77fkabbagvzlyn-mysql.services.clever-cloud.com",
  port: 3306,
  database: "bimchf77fkabbagvzlyn",
});

app.get("/", async (req, res) => {
  await db.query(
    `
        CREATE TABLE IF NOT EXISTS employees (
            id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            age int(10) NOT NULL,
            country varchar(100) NOT NULL,
            position varchar(100) NOT NULL,
            wage INT(10) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(`
        UPDATE employees SET wage = ? WHERE id = ?
    `, [wage, id], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROm employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/add", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    `
        INSERT INTO employees (name, age, country, position, wage) 
        VALUES (?, ?, ?, ?, ?)
    `,
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Insert successfully");
      }
    }
  );
});

app.listen("1100", () => {
  console.log("Server is running on port 1100");
});
