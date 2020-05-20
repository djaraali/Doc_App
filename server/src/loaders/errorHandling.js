import errList from '../utils/errorList';

module.exports = function (app) {
    //route not found handling
    app.use((req, res, next) => {
        const error = new Error('NOT_FOUND');
        next(error);
    });

    // Error handling
    app.use(async (error, req, res, next) => {
        const errObj = errList.errors[error.message];
        let err = {};
        if(errObj) {
            res.status(errObj.code || 500);
            res.json(errObj);
            err = errObj;
        } else {
            res.status(500);
            res.json(error);
            err = error;
        }
    });
}