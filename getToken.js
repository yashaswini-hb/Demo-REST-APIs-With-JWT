const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const process = require('./nodemon'); 

const Login = {
    user:'Test',
    pin:'ABCD@123' 
};

router.get('/jwt', async (req, res) => {
    console.log('credentials_____: ',Login);
    // Get JWT Token 
    var user = Login;    
    if (user) {
        var otp_ver = user.pin

        if (otp_ver) {
	const user1 = {

                phone: user.user,
                pin: user.pin
            }

            const token = jwt.sign({ user1 },

                process.env.JWT_KEY,
                {
                    expiresIn: "30d"
                }
            );


  	   return res.status(200).json({
                login: "Login successful",
                token: token
            })
           
        }
        else {
            return res.status(400).json({ login:"Incorrect PIN" });
        }
    }
    return res.status(400).json({login:'please enter Valid User...'});
});


module.exports = router;

