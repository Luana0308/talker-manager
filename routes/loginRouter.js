const express = require('express');
const router = express.Router();
const { validationEmail } = require('../middlewares/validationEmail');
const { validationPassword } = require('../middlewares/validationPassword')
const crypto = require('crypto');
const { httpResponse } = require('../utils');

const { OK_STATUS } = httpResponse;

// requisito 3
router.post('/', validationEmail, validationPassword, (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
      return res.status(OK_STATUS).json({ token });
  });

module.exports = router;
