const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const port = 3000;

let minikube_ip = "192.168.49.2:";

let microservices = {
  addition: { url: minikube_ip+"31304", secret:"addition-secret" },
  multipliction: { url: minikube_ip+"", secret:"mulipliction-secret" },
  subtraction: { url: minikube_ip+"", secret:"subtraction-secret" },
  rand_num: { url: minikube_ip+"", secret:"rand-num-secret" },
  rand_string: { url: minikube_ip+"", secret:"rand-string-secret" },
  timestamp: { url: minikube_ip+"", secret:"timestamp-secret" },
}

app.get("/api/add", (req, res) => {
  console.log(microservices)
  apiProxy.web(req, res, {target:microservices[addition].url});
  res.status(200).send("OK!");
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
