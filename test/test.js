const assert = require('assert');
const expect = require('chai').expect;

const osszead = function(a,b){
    return a + b;
}

describe('osszead', function(){
    it('should return 3 when a=1 and b = 2', function(){
        var c = osszead(1,2);
        expect(c).to.be.equal(3);
    })
});