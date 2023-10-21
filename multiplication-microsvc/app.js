const express = require('express');
const app = express();
const port = 3001;

app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  if (!num1 || !num2) {
    return res.status(400).json({ error: 'Both num1 and num2 parameters are required.' });
  }

  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Multiplication microservice is listening on port ${port}`);
});
