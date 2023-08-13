//switch cases
const EErrors = require("../services/errors/enums");

module.exports = (error, req, res, next) => {
    console.log(error.cause);

    switch (error.code) {
        case EErrors.INVALID_EMAIL:
            res
                .status(400)
                .send({ status: 'error', error: error.name, cause: error.cause })
            break;
        default:
            res.send({ status: 'error', error: 'unhandled error' })
            break;
    }
}