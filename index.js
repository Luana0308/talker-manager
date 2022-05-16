const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1
app.get('/talker', async (_req, res) => {
  const talker = await readFile();
  res.status(HTTP_OK_STATUS).send(talker);

  if (!talker.length) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const talker = await readFile();
  const { id } = req.params;
  const person = talker.filter((u) => u.id === id);
  res.status(HTTP_OK_STATUS).json({ person });
});

app.listen(PORT, () => {
  console.log('Online');
});
