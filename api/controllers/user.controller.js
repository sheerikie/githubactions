const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;



exports.createUser = async ({ name, email, password }) => {
    return await User.create({ name, email, password });
};
exports.getAllUsers = async (req, res) => {
    return await User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

exports.getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};
// // Find a single User with an id
// exports.findOne = async (req, res) => {
//     //console.log('email', req);
//     const email = req.email;

//     return await User.findByPk(email)
//         .then(data => {
//             res.send(data);
//         })

// };

exports.findByEmail = async (req, res) => {
    const email = req.email;
    return await User.findOne({ where: { email: email } }).then(response => {

        return response.dataValues;
    });
};

