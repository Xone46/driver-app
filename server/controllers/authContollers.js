const con = require('../config/db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// Start signup
exports.signup = async (req, res, next) => {

    //binding value email password

    const { email, password } = req.body;

    // valide input

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //-------------------------------------------//

    let sqlSearchUser = `SELECT * FROM users WHERE email = "${email}"`;

    con.query(sqlSearchUser, function (err, result) {

        if (result) {

            let flagUser = result.find((user) => {
                return user.email == email
            });

            if (!flagUser) {

                // async function 
                (async function () {

                    // hash password avec package bcryp 
                    const passwordHash = await bcrypt.hash(password, 10);

                    // login
                    if (passwordHash) {

                        let sql = `INSERT INTO users(id, email, password) VALUES ('','${email}','${passwordHash}')`;
                        con.query(sql, function (err, result) {

                            if (err) {
                                return res.status(400).json({ msg: err })
                            }

                            // JWT
                            const token = JWT.sign({
                                email
                            }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                                { expiresIn: 36000 }
                            )

                            return res.status(200).json({ msg: "succes", token: token })
                        });

                    }

                })()


            } else {
                return res.status(400).json({
                    "errors": [
                        {
                            "msg": "le Compte deja existe",
                        }
                    ]
                })
            }
        }
    })


}

// End Signup


// Start SignIn
exports.signin = async (req, res, next) => {

    //binding value email password
    const { email, password } = req.body;

    let sqlSearchUser = `SELECT * FROM users WHERE email = "${email}"`;

    con.query(sqlSearchUser, (err, result) => {

        if (result) {

            let flagUser = result.find((user) => {
                return user.password == password
            })

            res.status(200)

        }


        return res.status(400).json({
            "errors": [
                {
                    "msg": "Email Invalide",
                }
            ]
        })



    })

}

// End SignIn




