const { httpResponse } = require('../utils');

const { UNAUTHORIZED_STATUS } = httpResponse;

// requisito 5
const validationToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || authorization === undefined) {
    return res.status(UNAUTHORIZED_STATUS).json(
            {
                message: 'Token não encontrado',
            },
        );
    }

    if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED_STATUS).json(
            {
                message: 'Token inválido',
            },
        );
    }
    next();
};

module.exports = {
    validationToken,
};