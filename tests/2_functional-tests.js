const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert 10L (valid input)', function(done){
        chai.request(server).get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.equal(res.body.returnUnit, 'gal');
            assert.approximately(parseInt(res.body.returnNum), parseInt(2.64172), 1)
            done();
        })
    });
    test('Convert 32g (inValid input)', function(done){
        chai.request(server).get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.initUnit, undefined)
            done();
        })
    });
    test('Convert 3/7.2/4kg (inValid input)', function(done){
        chai.request(server).get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined)
            done();
        })
    });
    test('Convert 3/7.2/4kilomegagram (inValid input)', function(done){
        chai.request(server).get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
            assert.equal(res.body.initUnit, undefined);
            done();
        })        
    });
    
    test('Convert kg (valid input)', function(done){
        chai.request(server).get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
            assert.equal(res.body.returnUnit, 'lbs');
            done();
        })
    });
});
