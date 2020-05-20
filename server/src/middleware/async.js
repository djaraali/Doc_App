module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch(ex) {
            console.error("Error: ", ex);
            next(ex)
        }
    }
}