
const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const jwt = require('jsonwebtoken');
const Users = require("./controllers/user.controller.js");
const bcrypt = require('bcrypt');
const async = require("async");
const crypto = require("crypto");

const passport = require('passport');
const passportJWT = require('passport-jwt');
const authCheck = require('./middlewares/authCheck');
const sgMail = require('@sendgrid/mail');

const dotenv = require('dotenv');
dotenv.config();

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";


let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = Users.getUser({ id: jwt_payload.id });

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
// use the strategy
passport.use(strategy);

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(passport.initialize());


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// register route
app.post('/register', async function (req, res, next) {
    console.log('req', req.body);
    let { username, email, password } = req.body;
    name = username;
    console.log('xxl', req.body);
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    password = await bcrypt.hash(password, salt);

    Users.createUser({ name, email, password }).then(user => {
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ user, token, msg: 'account created successfully' })
    }
    );

});

app.post('/login', async function (req, res, next) {
    const { name, password } = req.body;
    if (name && password) {
        let user = await Users.getUser({ name: name });
        if (!user) {
            res.status(401).json({ message: 'No such user found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            // from now on we'll identify the user by the id and the id is the 
            // only personalized value that goes into our token
            let payload = { id: user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ msg: 'ok', token: token });
        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    }
});
app.put('/updateUser', async (req, res) => {

    const name = req.body.username;
    const email = req.body.email;
    const auth_id = req.body.auth_id;
    let user = await Users.getUser({ id: auth_id });
    if (!user) {
        res.status(401).json({ message: 'No such user found' });
    }
    try {
        db.users.update({
            name,
            email
        }, {
            where: {
                id: user.id
            }
        })
        return res.send({ message: 'User updated' });
    }
    catch (ex) {
        //logger.error(ex);
        res.status(400);
        return res.send({ error: ex });
    }
});
app.put('/updatePassword', async (req, res) => {
    const password = req.body.password;
    // // let payload = { id: user.id };
    // //let token = jwt.sign(payload, jwtOptions.secretOrKey);
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //const userId = decoded.data.userId;
    const auth_id = req.body.auth_id;
    let user = await Users.getUser({ id: auth_id });

    if (!user) {
        res.status(401).json({ message: 'No such user found' });
    }
    const salt = await bcrypt.genSalt(10);

    try {
        const hashedPassword = bcrypt.hash(password, salt);
        db.users.update({
            password: hashedPassword
        }, {
            where: {
                id: user.id
            }
        })
        return res.send({ message: 'Password Updated' });
    }
    catch (ex) {
        // logger.error(ex);
        res.status(400);
        return res.send({ error: ex });
    }
});
app.post('/passwordResetRequest', async (req, res) => {
    const email = req.body.email;
    const buffer = await crypto.randomBytes(32);
    const passwordResetToken = buffer.toString("hex");
    try {
        await db.users.update(
            {
                passwordResetToken
            }, {
            where: {
                email
            }
        }
        );
        const passwordResetUrl = `${process.env.FRONTEND_URL}/passwordReset?passwordResetToken=${passwordResetToken}`;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: email,
            from: process.env.FROM_EMAIL,
            subject: 'Password Reset Request',
            text: `
            Dear user,
You can reset your password by going to ${passwordResetUrl}
        `,
            html: `
            <p>Dear user,</p>
<p>
                You can reset your password by going to
                <a href="${passwordResetUrl}">this link</a>
            </p>
        `,
        };

        sgMail.send(msg);
        res.send({ message: 'Successfully sent email' });
    }
    catch (ex) {
        //  logger.error(ex);
        res.status(500).send(ex);
    }
});
app.post('/passwordReset', async (req, res) => {
    console.log('pwd', req.body);
    const password = req.body.password;
    const passwordResetToken = req.body.passwordResetToken;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const buffer = await crypto.randomBytes(32);
    const newPasswordResetToken = buffer.toString("hex");
    try {
        await db.users.update(
            {
                password: hashedPassword,
                passwordResetToken: newPasswordResetToken
            }, {
            where: {
                passwordResetToken
            }
        }
        )
        res.send({ message: 'Successfully reset password' });
    }
    catch (ex) {
        //  logger.error(ex);
        res.status(500).send(ex);
    }
});
require("./routes/tutorial.routes", passport.authenticate('jwt', { session: false }))(app);
require("./routes/user.routes")(app);
require("./routes/comment.routes", passport.authenticate('jwt', { session: false }))(app);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
//const PORT = process.env.NODE_ENV = "test"

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
