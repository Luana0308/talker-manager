const { httpResponse } = require('../utils');

const { BAD_REQUEST_STATUS } = httpResponse;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// requisito 4
const validationEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(BAD_REQUEST_STATUS).json(
            { 
                message: 'O campo "email" é obrigatório', 
            },
        );
    }

    if (!regexEmail.test(email)) {
        return res.status(BAD_REQUEST_STATUS).json(
            { message: 'O "email" deve ter o formato "email@email.com"', 
        },
);
    } 
    next();
};

module.exports = {
    validationEmail,
};