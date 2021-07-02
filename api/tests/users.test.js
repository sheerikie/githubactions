process.env.NODE_ENV = "test"

const User = require('../models').User;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();

chai.use(chaiHttp)


describe('/GET user', () => {
    it('it should Get all users', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/Register user', () => {
    it('it should register the user', (done) => {
        const user = {
            name: "Escobar",
            email: 'esco@g.co',
            password: "1234567"

        };

        chai.request(app)
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.user.should.have.property('name');
                res.body.user.should.have.property('password');
                res.body.msg.should.have.eq('account created successfully');
                done();
            });
    });
});

describe('/Login user', () => {
    it('it should login the user', (done) => {
        const user = {
            name: "Escobar",
            password: "1234567"

        };

        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.should.have.property('msg');
                res.body.msg.should.have.eq('ok');
                done();
            });
    });
});

describe('/Login user', () => {
    it('it should not login the user with wrong pwd', (done) => {
        const user = {
            name: "Escobar",
            password: "12347"

        };

        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                //   console.log(res);
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.have.eq('Password is incorrect');
                done();
            });
    });
});

describe('/Login user', () => {
    it('it should not login the user with wrong username', (done) => {
        const user = {
            name: "Escar",
            password: "1234567"

        };

        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                //   console.log(res);
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.have.eq('No such user found');
                done();
            });
    });
});
describe('/Login user', () => {
    it('it should not login the user with wrong username', (done) => {
        const user = {
            name: "Escar",
            // password: "1234567"

        };

        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                //   console.log(res);
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.have.eq('No such user found');
                done();
            });
    });
});
//
// describe('/PUT/:id user', () => {
//     it("should update the user info", (done) => {
//         const user = {
//             title: "Fear The walking dead",
//             description: "HBO series"
//         }
//         const userId = 2;

//         chai.request(app)
//             .put('/api/users/' + userId)
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//                 // res.body.should.have.property('title');
//                 /// res.body.should.have.property('statusType').eq('error');
//                 done();
//             });
//     });
// });

// describe('/DELETE/:id user', () => {
//     it("should delete the user info", (done) => {

//         const userId = 2;

//         chai.request(app)
//             .delete('/api/users/' + userId)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//                 // res.body.should.have.property('title');
//                 /// res.body.should.have.property('statusType').eq('error');
//                 done();
//             });
//     });
// });
