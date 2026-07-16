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
  try {
  let body = req.body;
  let name = req.body.name;
  let age = req.body.age;
  let species = req.body.species;
  console.log(body);

  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("age") ||
    !body.hasOwnProperty("species")
  ) {
    return res.sendStatus(400);
  }

  if (
    (name === "") || (!Number.isInteger(age)) || (!validSpecies.includes(species))
  ) {
    return res.sendStatus(400);
  }


  pool 
    .query(
      `INSERT INTO animals(name, age, species)
      VALUES($1, $2, $3)
      RETURNING *`,
      [name, age, species],
    ).then((result) => {
      console.log("Inserted:");
      console.log(result.rows);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500);
    });

  } catch (error) {
    return res.status(500).send();
  }
});

app.get("/animal", (req, res) => {
  const species = req.query.species

  if (!validSpecies.includes(species)) {
    res.sendStatus(400).send();
  }

  pool
  .query(
    `SELECT * FROM animals WHERE species = $1`,
  [species]).then((result) => {
    console.log("Queried:");
    console.log(result.rows);
    res.sendStatus(200);
    res.json( { rows: result.rows } );
  }).catch((error) => {
    console.log(error);
    return res.status(500).send();
  });
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
