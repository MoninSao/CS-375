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

  try {
    const zip = req.query.zip;
    let url = `${baseUrl}?zip=${zip}&appid=${apiKey}`;
    axios.get(url).then((response) => {
      console.log("Received response:", response.data);
      let ZIP = zip;
      let TMP = (response.data.main.feels_like - 273.15) * 9/5 + 32;
      res.json( {"zip": ZIP, "feels-like-fahrenheit": TMP } );
    });
    console.log(`Sending request to: ${url}`);
  } catch (error) {
    console.error("Validation error:", error.message);
    res.status(400).json({error: error.message });
  }

});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
