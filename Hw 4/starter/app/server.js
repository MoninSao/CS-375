let axios = require("axios");
let express = require("express");
let app = express();
let apiFile = require("../env.json");
let apiKey = apiFile["api_key"]; // use this to make requests
let baseUrl = apiFile["api_url"]; // use this to make requests
let port = 3000;
let hostname = "localhost";
app.use(express.static("public"));
// don't change code above this line

app.get("/forecast", (req, res) => {
  let zip = req.query.zip;
  axios
    .get(`${baseUrl}?appid=${apiKey}&zip=${zip}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      if (error.response) {
        res
          .status(error.response.status)
          .json({ error: error.response.data.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    });
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
