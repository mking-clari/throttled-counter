const cors = require('cors');
const express = require('express');
const Promise = require('bluebird');

const app = express();
app.use(cors({
  origin: 'http://localhost:8091',
}));

app.get('/', (req, res) => {
  const delay = Math.round(5000 * Math.random());
  return Promise.delay(delay)
    .then(() => {
      res.json({
        counter: Math.floor(10 * Math.random()),
      });
    });
});

const server = app.listen(8090, () => {
  console.log(`Listening on port ${server.address().port}`);
});
