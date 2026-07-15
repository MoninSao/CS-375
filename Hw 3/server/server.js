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
        return res.status(400).send("Invalid Request");
    };

    if ((!devices[id]) || (devices[id] = []) ) {
        devices[id].push(usage);
    }

    res.sendStatus(200);
});

// Requests to GET /api/deviceid should return an object containing a list of all reported energy usages for the device with ID deviceid.
app.get("/api/:deviceid", (req, res) => {
    const id = req.params.deviceid;
    if (!devices[id]) {
        return res.status(404).send("Device Not Found");
    };

    res.json( {"total-energy-usage": devices[id] } );
});

// Requests to GET / should return an HTML page containing a table summarizing each device’s energy usage.
app.get("/api", (req, res) => {
    let rows = "";

    for (const id in devices) {
        const readings = devices[id];
        const total = readings.reduce((sum, n) => sum + n, 0);
        const style = total > 1000 ? ' style="background-color: red;"' : "";

        rows += `<tr${style}>
            <td>${id}</td>
            <td>${readings.join(", ")}</td>
        </tr>`;
    }

    const html = `<!DOCTYPE html>
<html>
<head><title>Device Dashboard</title></head>
<body>
    <table border="1">
        <tr>
            <th>Device ID</th>
            <th>Energy Usage</th>
        </tr>
        ${rows}
    </table>
</body>
</html>`;

    res.send(html);
});



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

