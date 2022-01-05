const JWT = require('jsonwebtoken');


module.exports = async (res, req, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "No token found",
                }
            ]
        })
    }


    try {
        (async function () {
            let user = await JWT.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
            res.status(200).json({ msg: user });

        })
            ()


    } catch (error) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "token invalid",
                }
            ]
        })
    }

}