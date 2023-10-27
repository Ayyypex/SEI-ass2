const express = require('express');
const moment = require('moment-timezone');
const app = express();

app.get('/timestamp', (req, res) => {
    const adelaideTime = moment().tz('Australia/Adelaide');
    const formattedTime = adelaideTime.format('dddd, MMMM Do YYYY, h:mm:ss a');
    res.json({ timestamp: formattedTime });
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Timestamp microservice is listening on port ${PORT}`)
});