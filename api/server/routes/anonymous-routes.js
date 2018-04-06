var express = require('express'),
    quoter  = require('./quoter'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

app.get('/api/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});

app.post('/api/checkAccess', (req, res) => {
  const token = req.body.token
  console.log(`TOKEN: ${token}`)
  const payload = jwt.verify(token, config.secret)
  console.log(payload)
  res.send(payload.scope)
})
