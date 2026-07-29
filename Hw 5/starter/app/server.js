const express = require("express");
const { Pool } = require("pg");
const env = require("../env.json");

const app = express();
const pool = new Pool(env);

app.use(express.json());
app.use(express.static("public"));

const GENRES = ["scifi", "romance", "adventure"];

app.post("/add", (req, res) => {
  let { title, genre, quality } = req.body;

  if (
    typeof title !== "string" || title.length < 1 || title.length > 15 ||
    !GENRES.includes(genre) ||
    (quality !== "yes" && quality !== "no")
  ) {
    return res.status(400).end();
  }

  pool
    .query("INSERT INTO books (title, genre, quality) VALUES ($1, $2, $3)",
           [title, genre, quality])
    .then(() => res.status(200).end())
    .catch((err) => { console.log(err); res.status(400).end(); });
});

app.get("/search", (req, res) => {
  let genre = req.query.genre;

  if (!GENRES.includes(genre)) {
    pool
      .query("SELECT * FROM books")
      .then((result) => res.status(200).json({ rows: result.rows }))
      .catch((err) => { console.log(err); res.status(200).json({ rows: [] }); });
  } else {
    pool
      .query("SELECT * FROM books WHERE genre = $1", [genre])
      .then((result) => res.status(200).json({ rows: result.rows }))
      .catch((err) => { console.log(err); res.status(200).json({ rows: [] }); });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});