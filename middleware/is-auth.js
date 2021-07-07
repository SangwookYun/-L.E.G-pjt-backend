const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    console.log("inside of MiddleWare")
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret')
        console.log(decodedToken)
        console.log(decodedToken.exp)
        let iat = decodedToken.iat * 1000;
        let exp = decodedToken.exp * 1000;
        // let current  =new Date();
        // console.log(current.toLocaleString())
        console.log(new Date(iat))
        console.log(new Date(exp))
    }catch(err) {
        err.statusCode =500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode= 401;
        throw error;
    }
    req.userId= decodedToken.userId;
    next();
}