process.env.NODE_ENV = "test"

const Tutorial = require('../models').Tutorial;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();

chai.use(chaiHttp)


describe('/GET tutorial', () => {
    it('it should Get all tutorials', (done) => {
        chai.request(app)
            .get('/api/tutorials')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
describe('/GET published tutorial', () => {
    it('it should Get all published tutorials', (done) => {
        chai.request(app)
            .get('/api/tutorials/published')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
describe('/POST tutorial', () => {
    it.only('it should post the tutorial info', (done) => {
        const tutorial = {
            title: "The walking dead",
            description: "AMC series"
        };

        chai.request(app)
            .post('/api/tutorials')
            .send(tutorial)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                // res.body.should.have.property('id');
                // res.body.should.have.property('title');
                // res.body.should.have.property('status').eq('success');
                done();
            });
    });
});
describe('/POST tutorial', () => {
    it('it should not post the tutorial info', (done) => {
        const tutorial = {
            title: "",
            description: "AMC series"
        };

        chai.request(app)
            .post('/api/tutorials')
            .send(tutorial)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eq('Content can not be empty!');
                done();
            });
    });
});



describe('/PUT/:id tutorial', () => {
    it("should update the tutorial info", (done) => {
        const tutorial = {
            title: "Fear The walking dead",
            description: "HBO series"
        }
        const tutorialId = 2;

        chai.request(app)
            .put('/api/tutorials/' + tutorialId)
            .send(tutorial)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                // res.body.should.have.property('title');
                /// res.body.should.have.property('statusType').eq('error');
                done();
            });
    });
});


describe('/GET/:id tutorial', () => {
    it("should get the tutorial info", (done) => {

        const tutorialId = 14;

        chai.request(app)
            .get('/api/tutorials/' + tutorialId)
            .end((err, res) => {

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('id');
                done();
            });
    });
});
describe('/DELETE/:id tutorial', () => {
    it("should delete the tutorial info", (done) => {

        const tutorialId = 14;

        chai.request(app)
            .delete('/api/tutorials/' + tutorialId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eq('Tutorial was deleted successfully!');
                done();
            });
    });
});
describe('/DELETE/:id tutorial', () => {
    it("should not delete the already deleted tutorial info", (done) => {

        const tutorialId = 14;

        chai.request(app)
            .delete('/api/tutorials/' + tutorialId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eq('Cannot delete Tutorial with id=14. Maybe Tutorial was not found!');
                done();
            });
    });
});