const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const port = 3000;

let microservices = {
  addition: "http://addition-microsvc-service",
  multipliction: "http://multiplication-microsvc-service",
  subtraction: "http://subtraction-microsvc-service",
  rand_num: "http://rand-num-microsvc-service",
  rand_string: "http://rand-string-microsvc-service",
  timestamp: "http://timestamp-microsvc-service",
}

app.get("/add", (req, res) => {
  apiProxy.web(req, res, {target:microservices.addition});
});
app.get("/multiply", (req, res) => {
  apiProxy.web(req, res, {target:microservices.multipliction});
});
app.get("/subtract", (req, res) => {
  apiProxy.web(req, res, {target:microservices.subtraction});
});
app.get("/rand", (req, res) => {
  apiProxy.web(req, res, {target:microservices.rand_num});
});
app.get("/randString", (req, res) => {
  apiProxy.web(req, res, {target:microservices.rand_string});
});
app.get("/timestamp", (req, res) => {
  apiProxy.web(req, res, {target:microservices.timestamp});
});


// app.get('/add', (req, res) => {
//   const { num1, num2 } = req.query;
//   if (!num1 || !num2) {
//     return res.status(400).json({ error: 'Both num1 and num2 parameters are required.' });
//   }

//   const result = parseFloat(num1) + parseFloat(num2);
//   res.json({ result });
// });

app.listen(port, () => {
  console.log(`Gateway is listening on port ${port}`);
});
