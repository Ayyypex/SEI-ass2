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

	var regex = /^[-+]?[0-9]*\.?[0-9]+$/;
	if (!num1.match(regex)) {
		return res.status(400).json({ error: 'num1 must be a number' });
	}
	if (!num2.match(regex)) {
		return res.status(400).json({ error: 'num2 must be a number' });
	}
	
	// Complete addition and check if it worked
	var result = await add(num1, num2);
	console.log("Addition: " + result)
	if (result == null) return res.status(500).send("Server error with addition microservice");

	// Generate random number and multiply result by it
	var r = await rand();
	console.log("Random: " + r)
	if (r == null) return res.status(500).send("Server error with random number microservice");
	result = await multiply(result, r);
	console.log("Multiplication: " + result)
	if (result == null) return res.status(500).send("Server error with multipliction microservice");

	// Subract one from result
	result = await subtract(result, "1");
	console.log("Subtraction: " + result)
	if (result == null) return res.status(500).send("Server error with subtraction microservice");
	
	// Return a message with time stamp, the final result and a random string
	var time = await timestamp();
	console.log("Timestamp: " + time)
	if (time == null) return res.status(500).send("Server error with timestamp microservice");
	var string = await rand_string();
	console.log("Random String: " + string)
	if (string == null) return res.status(500).send("Server error with random string microservice");
	
	var reply = `${time}\nYour result was ${result}.\n${string}`
	res.send(reply);
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
async function subtract(x, y) {
	try {
		const response = await axios.get(microservices.subtraction+`/subtract?num1=${x}&num2=${y}`);
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
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Function to call random string microservice
async function rand_string() {
	try {
		const response = await axios.get(microservices.rand_string+"/randString");
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Function to call timestamp microservice
async function timestamp() {
	try {
		const response = await axios.get(microservices.timestamp+"/timestamp");
		return response.data["timestamp"];
	} catch (error) {
		console.error(error);
		return null;
	}
}