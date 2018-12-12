const router = require('express').Router();
var path = require('path');
const { Pool } = require('pg');
const c = require('./variables');

const pool = new Pool({
  user: c.user,
  password: c.password,
  database: c.database,
  host: c.host,
  port: 5432,
  ssl: true
});

// // fetch all todos
// router.get('/api/todos', (req, res) => {
//   Todo.find({})
//     .then(results => res.json(results))
//     .catch(() => res.sendStatus(500));
// });

router.get('/cards', (req, res) => {
  // const testPath = path.join(__dirname + '/../client/dist/index.html');

  pool
    .query('SELECT * FROM cards ORDER BY id ASC')
    .then(result => res.json(result.rows))
    .catch(e => console.error(e));
});

// get single card by id
router.get('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query('SELECT * FROM cards WHERE id = $1', [id])
    .then(result => res.json(result.rows))
    .catch(e => console.error(e));
});

// add new todo
router.post('/cards', (req, res) => {
  const { term, definition } = req.body;

  pool
    .query('INSERT INTO cards (term, definition) VALUES ($1, $2)', [
      term,
      definition
    ])
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

// // delete todo
router.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query('DELETE FROM cards WHERE id = $1', [id])
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

// update card
router.put('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { term, definition } = req.body;

  pool
    .query('UPDATE cards SET term = $1, definition = $2 WHERE id = $3', [
      term,
      definition,
      id
    ])
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

module.exports = router;
