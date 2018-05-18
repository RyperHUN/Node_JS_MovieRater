const assert = require('assert');
const expect = require('chai').expect;

const osszead = function(a,b){
    return a + b;
};

const asyncOsszead = function(a,b,cb){
    setTimeout(function(){
        cb(a+b);
    },100);
};

describe('osszead', function(){
    it('should return 3 when a=1 and b = 2', function(){
        var c = osszead(1,2);
        expect(c).to.be.equal(3);
    });
});

describe('osszeadAsync', function(done){
    it('should return 3 when a=1 and b = 2 + ASYNC', function(){
        asyncOsszead(1,2, function(c){
            expect(c).to.be.equal(3);     
            done();
        });
    });
});


describe('complexTest', function(done){
    before(function(){
            //Runs before every test
    });
    it('Body', function(done){
        done();
    });

    after(function(){
       //Runs one after every test 
    });
});