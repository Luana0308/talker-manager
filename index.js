const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
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
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const talker = await readFile();
  const { id } = req.params;
  const person = talker.filter((u) => u.id === +id);

  if (!person.length) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).send(person[0]);
});

// requisito 3
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
