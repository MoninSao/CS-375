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

Client-side validation can't really be trusted. There's a bunch of ways people can get around it.
For one, JavaScript can just be turned off, so the browser won't even run your validation code. 
People can also use stuff like curl to send an HTTP request directly without ever loading your 
HTML page. And even if they do load the page, browser dev tools let anyone edit the HTML 
and JavaScript live to just delete the validation checks. On top of that, 
someone who actually wants to cause problems could write their own client that ignores all your rules anyway.
The thing is, the server is the part you control. It's basically the source of truth 
since it's the only place you fully own, so it's the only place you can actually trust.
So to sum it up, client-side validation is mostly there to make the experience nicer, 
like giving instant feedback and cutting down on pointless requests. 
Server-side validation is what actually keeps things secure and reliable.
You should do both, but server-side is the one you can't skip. 
It's kind of your safety net that catches whatever the client-side stuff misses, 
whether that happens by accident or someone doing it on purpose.
*/
