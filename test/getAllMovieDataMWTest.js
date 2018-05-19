const assert = require('assert');
const expect = require('chai').expect;

describe('GetAllMovieData MiddleWare test', function(done){
    const getAllMovieDataMW = require('../middleware/getAllMovieData.js');
    var req;
    var res;
    var fakeRatingModel;

    before(function(){
        req = { }; 
        res = { 
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
        var testRatingData2 = Object.assign({},testRatingData);
        testRatingData2.rating = 6;
        var resultData = [
            testRatingData, testRatingData2
        ]
        fakeRatingModel = {
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
    });
    it('It should return all movie data', function(done){
        
        
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