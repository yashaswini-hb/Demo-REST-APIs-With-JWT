const jwt = require('jsonwebtoken'); 
const process = require('./nodemon');
 
module.exports = (req, res, next) => {
    try {
        //const payload = {
          //  exp: moment().add(10, 'days').unix(),
            //iat: moment().unix()
          //}
        const token = req.headers.authorization.split(" ")[1];
	if (token == null){ 
	return res.status(401).json({
            message: 'No token provided..'
        });  

	}
       // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Auth failed'
        });
    }
};