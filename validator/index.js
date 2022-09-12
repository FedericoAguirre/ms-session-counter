const { checkSchema } = require('express-validator');

countValidation = checkSchema({
    app: {
        in: ['body'],
        errorMessage: 'App is missing or wrong.',
        isEmpty: false,
        isAlphanumeric: true,
    },
    node: {
        in: ['body'],
        errorMessage: 'Node is missing or wrong.',
        isInt: true,
        toInt: true,
    },
    timestamp: {
        in: ['body'],
        errorMessage: 'Timestamp is missing or wrong.',
        isInt: true,
        toInt: true,
    }
});

module.exports = {countValidation};