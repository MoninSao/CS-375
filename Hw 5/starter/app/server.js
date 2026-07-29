app.use(express.json());

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