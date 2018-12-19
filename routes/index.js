const router = require('express').Router();
var path = require('path');
const { Pool } = require('pg');
// const uuidv1 = require('uuid/v1');
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

router.get('/sets', (req, res) => {
  pool
    .query('SELECT * FROM sets ORDER BY id DESC')
    .then(result => res.json(result.rows))
    .catch(e => console.error(e));
});

router.get('/collection/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // const testPath = path.join(__dirname + '/../client/dist/index.html');

  pool
    .query('SELECT * FROM cards WHERE set = $1 ORDER BY id DESC', [id])
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

router.post('/sets', (req, res) => {
  const { name } = req.body;
  pool
    .query('INSERT INTO sets (name) VALUES ($1)', [name])
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e));
});

router.post('/cards', (req, res) => {
  const { term, definition, currentSet } = req.body;

  pool
    .query(
      'INSERT INTO cards (term, definition, set) VALUES ($1, $2, $3)',
      [term, definition, currentSet]
    )
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

router.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query('DELETE FROM cards WHERE id = $1', [id])
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

router.delete('/sets/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query('DELETE FROM sets WHERE id = $1', [id])
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

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

router.put('/sets/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query(
      'UPDATE sets SET terms = (SELECT count(*) FROM cards WHERE SET = $1) WHERE id = $1',
      [id]
    )
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

module.exports = router;
