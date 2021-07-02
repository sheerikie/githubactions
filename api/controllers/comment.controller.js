const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;
exports.createComment = (req, res) => {
    return Comment.create({
        name: req.body.name,
        text: req.body.text,
        tutorialId: req.body.tutorialId,
    })
        .then((comment) => {
            res.send(comment);

            //  console.log(">> Created comment: " + JSON.stringify(comment, null, 4));

        })
        .catch((err) => {
            console.log(">> Error while creating comment: ", err);
        });
};
exports.findCommentById = (req, res) => {
    const id = req.params.id;

    return Comment.findByPk(id, { include: ["tutorial"] })
        .then((comment) => {
            res.send(comment);
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};