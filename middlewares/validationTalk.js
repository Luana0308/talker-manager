const { httpResponse } = require('../utils');

const { BAD_REQUEST_STATUS } = httpResponse;

// requisito 5
const validationTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || (!talk.rate && talk.rate !== 0) || !talk.watchedAt) {
        return res.status(BAD_REQUEST_STATUS).json(
            {
                message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
            },
        );
    }

    next();
};

module.exports = {
    validationTalk,
};