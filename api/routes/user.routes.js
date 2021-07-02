module.exports = app => {

    const users = require("../controllers/user.controller.js");


    var router = require("express").Router();


    // Create a new Users
    router.post("/", users.createUser);

    // Retrieve all Tutorials
    router.get("/", users.getAllUsers);


    app.use('/api/users', router);
};