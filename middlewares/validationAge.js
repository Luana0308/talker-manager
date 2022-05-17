const { httpResponse } = require('../utils');

const { BAD_REQUEST_STATUS } = httpResponse;

// requisito 5
const validationAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === ' ') {
    return res.status(BAD_REQUEST_STATUS).json(
            {
                message: 'O campo "age" é obrigatório',
            },
        );
    }

    if (age < 18) {
    return res.status(BAD_REQUEST_STATUS).json(
            {
                message: 'A pessoa palestrante deve ser maior de idade',
            },
        );
    }
    next();
};

module.exports = {
    validationAge,
};