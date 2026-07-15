console.log("Starting server...");

let axios = require("axios");
let express = require("express");
let app = express();
app.use(express.static("public"));

console.log("Loading API key...");
let apiFile = require("../key.json");
let apiKey = apiFile["key"];
console.log("API key loaded:", apiKey ? "✓" : "✗");

let port = 3000;
let hostname = "localhost";

let baseUrl = "https://api.openweathermap.org/data/2.5/weather";

app.get("/feels-like", (req, res) => {

  try {
    const zip = req.query.zip;
    let url = `${baseUrl}?zip=${zip}&appid=${apiKey}`;
    console.log(`Sending request to: ${url}`);
    
    axios.get(url).then((response) => {
      console.log("Received response:", response.data);
      let ZIP = zip;
      let TMP = (response.data.main.feels_like - 273.15) * 9/5 + 32;
      res.json( {"zip": ZIP, "feels-like-fahrenheit": TMP } );
    }).catch((error) => {
      // Handle API errors from OpenWeather API
      if (error.response && error.response.status) {
        console.error("API error:", error.response.status, error.response.data);
        // OpenWeather API returned an error (e.g., invalid zip code)
        const errorMessage = error.response.data.message || "Invalid request";
        res.status(400).json({error: errorMessage});
      } else {
        // Other network or client errors
        console.error("Fetch error:", error.message);
        res.status(500).json({error: "Something went wrong"});
      }
    });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({error: "Something went wrong"});
  }

});

app.listen(port, hostname, () => {
  console.log("✓ Server started!");
  console.log(`http://${hostname}:${port}`);
});
