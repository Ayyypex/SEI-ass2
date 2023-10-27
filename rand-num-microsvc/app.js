const express = require('express');
const app = express();

app.get('/rand', (req, res) => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    res.send(randomNum.toString() + '\n');
})

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Random number microservice is listening on port ${PORT}`)
});