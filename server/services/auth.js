

//MIDDLEWARE
exports.checkJWT = function(req, res, next) {

    const isValidToken = false;

    if (isValidToken) {
        //continue with route handler
        next();
    } else {
        return res.status(401).send({title: 'Not Authorized', detail: 'Please login in order to get data.'})
    }

}
