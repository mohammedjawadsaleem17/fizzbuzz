// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hey I am Working !!")
})

app.post('/fizzbuzz', (req, res) => {
  const { values } = req.body;
  console.log(`These are the values that i gotcha`, values);
  //Values return type is an Array!
  console.log(typeof values[0])
  const result = values.map(value => {
    console.log(`individual value`, value);

    const divisible3 = value % 3 === 0;
    const divisible5 = value % 5 === 0;
    const divisions = [];

    if (divisible3) divisions.push(` Divided ${value} by 3`);
    if (divisible5) divisions.push(`Divided ${value} by 5`);

    if (divisible3 && divisible5) return { value, output: 'FizzBuzz', divisions };
    if (divisible3) return { value, output: 'Fizz', divisions };
    if (divisible5) return { value, output: 'Buzz', divisions };
    if (isNaN(value)) return { value, output: 'Invalid item', divisions: [] };

    return { value, output: '', divisions };
  });
  console.log(`I am returning the json reponse`)
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;  