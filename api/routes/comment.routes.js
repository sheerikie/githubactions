module.exports = app => {

    const comments = require("../controllers/comment.controller.js");


    var router = require("express").Router();


    // Create a new Users
    router.post("/", comments.createComment);

    // Retrieve all Tutorials
    router.get("/:id", comments.findCommentById);


    app.use('/api/comments', router);
};