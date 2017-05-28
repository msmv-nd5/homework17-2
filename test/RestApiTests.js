const supertest = require('supertest');
const expect = require('chai').expect;
const User = require('../usersModel');

describe('REST API', () => {
    let server;
    before((done) => {
        require('../app');
        setTimeout(() => {
            server = supertest.agent('http://localhost:3000');
            done();
        }, 1000);
    });

    describe('создание пользователя', () => {

        it('POST /api/v1/users должен вернуть код 200 и объект пользователя', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .send({
                    'name': 'test',
                    'score': 10
                })
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.equal('test');
                    expect(response.body.score).to.equal('10');
                    done();
                });
        });

        it('POST /api/v1/users должен вернуть код 200 и объект пользователя, если нет параметра name', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .send({
                    'score': 11
                })
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.be.undefined;
                    expect(response.body.score).to.equal('11');
                    done();
                });
        });



        it('POST /api/v1/users должен вернуть код 200 и объект пользователя, если нет параметра score', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .send({
                    'name': 'test2'
                })
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.score).to.be.undefined;
                    expect(response.body.name).to.equal('test2');
                    done();
                });
        });


        it('POST /api/v1/users должен вернуть код 200 и только ID, если нет параметров', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.be.undefined;
                    expect(response.body.score).to.be.undefined;
                    expect(response.body.id).to.not.be.undefined;
                    done();
                });
        });

    });


    describe('удаление пользователя', () => {

        it('DELETE /api/v1/users/0 должен вернуть код 200', done => {
            server
                .delete('/api/v1/users/0')
                .expect(200)
                .end((err, response) => {
                    done();
                });
        });


        it('DELETE /api/v1/users/999999 должен вернуть код 500', done => {
            server
                .delete('/api/v1/users/999999')
                .expect(500)
                .end((err, response) => {
                    done();
                });
        });

        it('DELETE /api/v1/users должен вернуть код 404', done => {
            server
                .delete('/api/v1/users')
                .expect(404)
                .end((err, response) => {
                    done();
                });
        });

    });

});