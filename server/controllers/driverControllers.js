const con = require('../config/db');



exports.index = async (req, res, next) => {
    console.log('index');
}

exports.create = async (req, res, next) => {

    try {

        let { name, phone, email, old, typeDrive } = req.body;

        let d = new Date();
        let yyyy = d.setFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDay();
        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `INSERT INTO drivers(id, name, phone, email, createdAtDate, typeDrive, old) VALUES ('','${name}','${phone}','${email}','${createdAtDate}','${typeDrive}','${old}')`;
        con.query(sql, (err, result) => {

            if (err) {
                res.status(400).json({ message: err })
            }
            if (result) {
                res.status(200).json({ message: result })
            }

        });

    } catch (error) {
        console.log(error);
        next(error);
    }

}
exports.select = async (req, res, next) => {

    try {

        let id = req.params.id;
        let sql = `SELECT * FROM drivers WHERE id = '${id}'`;
        con.query(sql, (err, result) => {
            if (err) {
                res.status(400).json({ message: err })
            }
            if (result) {
                res.status(200).json({ message: result })
            }
        });

    } catch (error) {
        console.log(error);
        next(error);
    }

}



