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
  validationToken,
  validationName, 
  validationAge, 
  validationTalk,
  validationWatchedAt,
  validationRate,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = await readFile();
  const id = talker.length;
    await writeFile([...talker, { id: id + 1, name, age, talk: { watchedAt, rate } }]);
  return res.status(CREATED_STATUS).json({ id: id + 1, name, age, talk: { watchedAt, rate } });
});

// requisito 6
router.put('/:id', 
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatchedAt,
  validationRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  console.log(req.body);
  const newTalker = { id: +id, name, age, talk: { watchedAt, rate } };
  const talker2 = await readFile();
  const talkerId = talker2.map((talker) => (talker.id === +id ? newTalker : talker));
  await writeFile(talkerId);
  console.log(newTalker);
  return res.status(OK_STATUS).json(newTalker);
});

  module.exports = router;
