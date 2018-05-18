const assert = require('assert');
const expect = require('chai').expect;

describe('Get all movie data tests', function(done){
    it('It should return all movie data', function(done){
        var req = { }; 
        var res = { 
            tpl:{ 
                error : [] 
            }
        };

        var testRatingData = {
            movie :{
                name : "TestMovie",
                _id : 1
            },
            rating : 5,
            user : {}
        }
        testRatingData2 = Object.assign({},testRatingData);
        testRatingData2.rating = 6;
        var resultData = [
            testRatingData, testRatingData2
        ]

        var fakeRatingModel = {
            exec: function(cb){
                cb(undefined, resultData);
            },
            populate : function(name){
                return this;  
            },
            find : function(query){
                return this;
            }
        };
        const getAllMovieDataMW = require('../middleware/getAllMovieData.js');
        fv = getAllMovieDataMW({RatingModel: fakeRatingModel});
        fv(req,res,function(err){
            expect(err).to.not.exist;
            expect(res.tpl.error).to.be.empty;
            expect(res.tpl.concat).to.exist;
            expect(res.tpl.concat).to.be.length(1);
            var mergedRating = res.tpl.concat[0].rating;
            expect(mergedRating).closeTo(5.5, 0.01);
            done();
        });
    });
});