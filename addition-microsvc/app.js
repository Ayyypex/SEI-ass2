const express = require('express');
const app = express();
const port = 3000;

app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  console.log(`Called with ${num1} and ${num2}`)
  if (!num1 || !num2) {
    return res.status(400).json({ error: 'Both num1 and num2 parameters are required.' });
  }

  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Addition microservice is listening on port ${port}`);
});
