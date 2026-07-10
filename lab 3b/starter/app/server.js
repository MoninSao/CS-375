const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.static("public"));

// returns random integer in range [min, max]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples
function getRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}


function validateMinMax(minStr, maxStr) {
    const min = parseInt(minStr);
    const max = parseInt(maxStr);
    if (Number.isNaN(min) || Number.isNaN(max)) {
      throw new Error("min and max must be valid numbers");
    }

    if (min > max) {
      throw new Error("min cannot be bigger than max");
    }

    return { min, max };
}

app.get("/random", (req, res) => {
  try{   
    console.log("Received query string:", req.query);
    const { min, max } = validateMinMax(req.query.min, req.query.max);

    let randomNumber = getRandomIntegerInRange(min, max);
    console.log("Selected random number", randomNumber);
    res.json({ number: randomNumber });

  } catch (error) {
    console.error("Validation error:", error.message);
    res.status(400).json({ error: error.message});
  }

});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});

/*
TEXT ANSWERS GO HERE

*/
