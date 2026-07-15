const express = require("express");
const { hostname } = require("node:os");
const app = express();

const port = 3000;
app.use(express.json());

// create a hash map to hold the device data
const devices = {};


// Requests to POST /api/deviceid may have energy usage data in the body.
app.post("/api/:deviceid", (req, res) => {
    const id = req.params.deviceid;
    const usage = req.body["energy-usage"];

    if (!Number.isInteger(usage)) {
        return res.status(400).send("Invalid: The energy usage must be an integer");
    };

    if ((!devices[id]) || (devices[id] = []) ) {
        devices[id].push(usage);
    }

    res.sendStatus(200);
});





app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

