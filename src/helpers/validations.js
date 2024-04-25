const {validationResult} = require("express-validator");
const {error} = require("./response");

const validate = validations => {
    return async (req, res, next) => {
        await validations.reduce(async (promise, validation) => {
            await promise;
            return validation.run(req);
        }, Promise.resolve());
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errorArray = errors.array();
        res.json(error(errorArray[0].msg, errorArray))
    }
}

module.exports = {
    validate
}