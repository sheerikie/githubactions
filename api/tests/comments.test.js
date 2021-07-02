process.env.NODE_ENV = "test"

const Comment = require('../models').Comment;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();

chai.use(chaiHttp)


// describe('/GET comment', () => {
//     it('it should Get all comments', (done) => {
//         chai.request(app)
//             .get('/api/comments')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 done();
//             });
//     });
// });

describe('/POST comment', () => {
    it('it sould post the comment info', (done) => {
        const comment = {
            name: "Tyron Lannister",
            text: "GOT",
            tutorialId: 1
        };

        chai.request(app)
            .post('/api/comments')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                // res.body.should.have.property('status').eq('success');
                done();
            });
    });
});


// describe('/PUT/:id comment', () => {
//     it("should update the comment info", (done) => {
//         const comment = {
//             name: "John Snow",
//             text: "GOT2",
//             tutorialId: 1
//         }
//         const commentId = 2;

//         chai.request(app)
//             .put('/api/comments/' + commentId)
//             .send(comment)
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

describe('/GET/:id comment', () => {
    it("should get the comment info", (done) => {

        const commentId = 7;

        chai.request(app)
            .get('/api/comments/' + commentId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('text');
                res.body.should.have.property('tutorialId');
                /// res.body.should.have.property('statusType').eq('error');
                done();
            });
    });
});
