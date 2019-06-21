const express = require('express');
const db = require('./handleDB');
const app = express();
const port = process.env.Port || 5000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.listen(port, () => {
  console.log('Listening to ' + port + ', lol');
});

/*app.get('/', (req, res) => {
  db.getAll().then((rows) => res.json(rows));
});*/

app.get('/get_list', (req, res) => {
  const type = req.query.type;
  if (req.query.type == 'all')
    db.getAll().then((rows) => res.json(rows));
  else if (req.query.type == 'search')
    db.search(req.query.query).then((rows) => res.json(rows));
  else
    db.getProducts(type).then((rows) => res.json(rows));
});


app.get('/search', (req, res) => {
  const query = req.query.query;
  db.search().then((rows) => res.json(rows));
});
