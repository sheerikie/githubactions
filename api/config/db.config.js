const dotenv = require('dotenv');
dotenv.config();
// const PORT = process.env.development.PORT || 3000;
module.exports = {
    HOST: process.env.HOST || "localhost",
    USER: process.env.MYSQL_ROOT || "phpmyadmin",
    PASSWORD: process.env.MYSQL_PASSWORD || "itera",
    DB: process.env.MYSQL_DATABASE || "tutorials",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};