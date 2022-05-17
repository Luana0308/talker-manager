const express = require('express');

const { validationAge } = require('../middlewares/validationAge');
const { validationName } = require('../middlewares/validationName');
const { validationTalk } = require('../middlewares/validationTalk');
const { validationWatchedAt } = require('../middlewares/validationWatchedAt');
const { validationRate } = require('../middlewares/validationRate');
const { validationToken } = require('../middlewares/validationToken');

const router = express.Router();
const { readFile, httpResponse, writeFile } = require('../utils');

const { OK_STATUS, NOT_FOUND_STATUS, CREATED_STATUS } = httpResponse;

// requisito 1
router.get('/', async (_req, res) => {
  const talker = await readFile();
  res.status(OK_STATUS).send(talker);
});

// requisito 2
router.get('/:id', async (req, res) => {
  const talker = await readFile();
  const { id } = req.params;
  const person = talker.filter((u) => u.id === +id);

  if (!person.length) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(OK_STATUS).send(person[0]);
});

// requisito 5
router.post('/', 
  validationName, 
  validationAge, 
  validationTalk,
  validationWatchedAt,
  validationRate,
  validationToken,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = await readFile();
  const id = talker.length;
    await writeFile([...talker, { id: id + 1, name, age, talk: { watchedAt, rate } }]);
  return res.status(CREATED_STATUS).json({ id: id + 1, name, age, talk: { watchedAt, rate } });
});

  module.exports = router;
