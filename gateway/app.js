const express = require('express');
const httpProxy = require('http-proxy');
const axios = require('axios');
const app = express();
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

// Standard use of microservices
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


app.get("/api", async (req, res) => {
	// get paramaters and check they exist
	const { num1, num2 } = req.query;
	if (!num1 || !num2) return res.status(400).json({ error: 'Both num1 and num2 parameters are required.' });
	
	// Complete addition and check if it worked
	var result = await add(num1, num2);
	if (result == null) return res.status(500).send("Server error");

	// Generate random number and multiply result by it
	var rand = await rand();
	res.send(addition.toString());
});

app.listen(port, () => {
  console.log(`Gateway is listening on port ${port}`);
});

// Function to call addition microservice
async function add(x, y) {
	try {
		const response = await axios.get(microservices.addition+`/add?num1=${x}&num2=${y}`);
		return response.data["result"];
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Function to call multiplication microservice
async function multiply(x, y) {
	try {
		const response = await axios.get(microservices.multipliction+`/multiply?num1=${x}&num2=${y}`);
		return response.data["result"];
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Function to call subtraction microservice
async function subtract() {
	try {
		const response = await axios.get(microservices.subtraction+`/subtract?num1=${x}&num2=${y}`;
		return response.data["result"];
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Function to call random number microservice
async function rand() {
	try {
		const response = await axios.get(microservices.rand_num+"/rand");
		return response.data["result"];
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Function to call random string microservice
async function rand_string() {
	try {
		const response = await axios.get(microservices.rand_string+"/rand");
		return response.data["result"];
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Function to call timestamp microservice
async function time() {
	try {
		const response = await axios.get(microservices.timestamp+"/timestamp");
		return response.data["result"];
	} catch (error) {
		console.error(error);
		return null;
	}
}