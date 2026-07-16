let express = require("express");
let { Pool } = require("pg");
let env = require("../env.json");

let hostname = "localhost";
let port = 3000;
let app = express();

app.use(express.json());
app.use(express.static("public"));

let pool = new Pool(env);
pool.connect().then(() => {
  console.log("Connected to database");
});

// TODO comment this out after question 1
// pool
//   .query(
//     `INSERT INTO animals(name, age, species) 
//     VALUES($1, $2, $3)
//     RETURNING *`,
//     ["Spot", 4, "dog"],
//   )
//   .then((result) => {
//     // row was successfully inserted into table
//     console.log("Inserted:");
//     console.log(result.rows);
//   })
//   .catch((error) => {
//     // something went wrong when inserting the row
//     console.log(error);
//   });

let validSpecies = ["cat", "dog", "turtle", "antelope"];

app.post("/animal", (req, res) => {
  let body = req.body;
  let name = req.body.name;
  let age = req.body.age;
  let species = req.body.species;
  console.log(body);
  pool 
    .query(
      `INSERT INTO animals(name, age, species)
      VALUES($1, $2 $3)
      RETURNING *`,
      [name, age, species],
    ).then((result) => {
      console.log("Inserted:");
      console.log(result.rows);
    })
    .catch((error) => {
      console.log(error);
      
    });


  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("age") ||
    !body.hasOwnProperty("species")
  ) {
    return res.sendStatus(400);
  }
  res.send();
});

app.get("/animal", (req, res) => {
  // here's a sample select query
  // pool.query(`SELECT * FROM animals WHERE name = $1`, ["Fluffy"]);
  res.send();
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
