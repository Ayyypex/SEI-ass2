const express = require ('express');
const app = express();

const strings = ["Thankyou for using our Microservice/Gateway system!", "This string was chosen randomly", 
    "I love software engineering!", "Here is your final result", 
    "This system contains a gateway and 6 other microservices"];

app.get('/randString', (req, res) => {
    const randIndex = Math.floor(Math.random() * strings.length);
    const randStr = strings[randIndex];
    res.send(randStr + '\n');
});

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Random string microservice is listening on port ${PORT}`)
});