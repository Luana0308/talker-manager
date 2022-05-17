const { httpResponse } = require('../utils');

const { BAD_REQUEST_STATUS } = httpResponse;

// requisito 5
const validationRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
    return res.status(BAD_REQUEST_STATUS).json(
            {
                message: 'O campo "rate" deve ser um inteiro de 1 à 5',
            },
        );
    }
    next();
};

module.exports = {
    validationRate,
};