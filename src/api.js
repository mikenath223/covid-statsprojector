const express = require("express");
var bodyParser = require("body-parser");
let estimator = require('./estimator.js');
let stringify = require('json-stringify-safe');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/api/v1/on-covid-19', (req, res) => res.send('Hello World!'));

// app.get('/home', (req, res) => res.send('Hello Home!'));
app.post('/api/v1/on-covid-19', (req,res) => {
  var data = req.body.data;
  data = stringify(data);

  // let result = estimator.covid19ImpactEstimator(JSON.parse(data));
  res.send(typeof JSON.parse(data));
  // res.end("yes");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));