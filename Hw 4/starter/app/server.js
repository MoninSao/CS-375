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

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
