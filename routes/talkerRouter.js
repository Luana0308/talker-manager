const express = require('express');
const router = express.Router();
const { readFile, httpResponse } = require('../utils');

const { OK_STATUS, NOT_FOUND_STATUS } = httpResponse;

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

  module.exports = router;