const { httpResponse } = require('../utils');

const { BAD_REQUEST_STATUS } = httpResponse;

// requisito 5
const validationWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!dateRegex.test(watchedAt)) {
    return res.status(BAD_REQUEST_STATUS).json(
            {
                message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
            },
        );
    }

    next();
};

module.exports = {
    validationWatchedAt,
};