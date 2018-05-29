const assert = require('assert');
const expect = require('chai').expect;

const bcrypt = require('../third_party/omdb');
const omdbToMyDb = require('../middleware/common').omdbToMyDB;


describe('OMDB Tests', function(done){
    const movieName = "Matrix";
    const omdb = require("../third_party/omdb");
    beforeEach(function(){
        
    });

    it('It should return the searched movies', function(done){   
        omdb.search(movieName,function(err,movies){
            expect(err).to.not.exist;
            expect(movies).length.to.be.greaterThan(0);
            //console.log(movies);
            done();
        });
    });

    it('It should map to the database equivalent', function(done){   
        omdb.search(movieName,function(err,movies){
            expect(err).to.not.exist;
            expect(movies).length.to.be.greaterThan(0);
            movies = movies.map(elem => omdbToMyDb(elem));
            //console.log(movies);
            done();
        });
    });
});