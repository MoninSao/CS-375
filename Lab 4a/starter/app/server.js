let axios = require("axios");
let express = require("express");
let app = express();
app.use(express.static("public"));

let apiFile = require("../key.json");
let apiKey = apiFile["key"];

let port = 3000;
let hostname = "localhost";

let baseUrl = "https://api.openweathermap.org/data/2.5/weather";

app.get("/feels-like", (req, res) => {
  let zip = 19104;
  let url = `${baseUrl}?zip=${zip}&appid=${apiKey}`;
  axios.get(url).then((response) => {
    console.log("Received response:", response.data);
    res.json(response.data);
  });
  console.log(`Sending request to: ${url}`);
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
