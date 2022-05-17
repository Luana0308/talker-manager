const { httpResponse } = require('../utils');

const { BAD_REQUEST_STATUS } = httpResponse;

// requisito 4
const validationPassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        res.status(BAD_REQUEST_STATUS).json({"message": "O campo \"password\" é obrigatório"})
    }

    if (password.length < 6) {
        res.status(BAD_REQUEST_STATUS).json({"message": "O \"password\" deve ter pelo menos 6 caracteres"})
    }
    next();
};

module.exports = {
    validationPassword
}