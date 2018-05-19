const assert = require('assert');
const expect = require('chai').expect;

const bcrypt = require('bcrypt');


describe('Login test', function(done){
    const mockedPw = "asd";
    var req; 
    var res; 
    var fakeUserModel;
    const checkLoginMW = require('../middleware/user/checkLogin.js');
    beforeEach(function(){
        req = { 
            body : {
                mail : "test@gmail.com",
                password : mockedPw,
                remember : "on"
            },
            session : {}
        }; 
        res = { 
            tpl:{ 
                error : [] 
            },
            storage : {},
            cookie: function(key, obj){
                this.storage[key] = obj;
            }
        };

        fakeUserModel = {
            findOne : function(query, cb){
                hashPw = bcrypt.hashSync(mockedPw, 10);
                return cb(null, {password:hashPw});
            }
        };
    });

    it('It should login the user', function(done){   
        loginFv = checkLoginMW({UserModel: fakeUserModel});
        loginFv(req,res,function(err){
            expect(err).to.not.exist;
            expect(res.tpl.error).to.be.empty;
            expect(req.session.isLoggedIn).to.exist;
            expect(req.session.isLoggedIn).to.be.true;
            expect(res.storage['user']).to.exist;
            done();
        });
    });
    it('It should login the user without cookie save', function(done){   
        req.body.remember = "off";
        loginFv = checkLoginMW({UserModel: fakeUserModel});
        loginFv(req,res,function(err){
            expect(err).to.not.exist;
            expect(res.tpl.error).to.be.empty;
            expect(req.session.isLoggedIn).to.exist;
            expect(req.session.isLoggedIn).to.be.true;
            expect(res.storage['user']).to.not.exist;
            done();
        });
    });

    it('User already logged in', function(done){   
        loginFv = checkLoginMW({UserModel: fakeUserModel});
        req.session.isLoggedIn = true;
        loginFv(req,res,function(err){
            expect(err).to.not.exist;
            expect(res.tpl.error).to.be.empty;
            done();
        });
    });

    it('No body parameter provided, should return error', function(done){   
        loginFv = checkLoginMW({UserModel: fakeUserModel});
        delete req.body;
        loginFv(req,res,function(err){
            expect(err).to.not.exist;
            expect(res.tpl.error).to.be.not.empty;
            expect(req.session.isLoggedIn).to.be.false;
            done();
        });
    });

    it('Email is not found error', function(done){   
        fakeUserModel.findOne = function(query, cb){
            cb("big error", undefined);
        }
        loginFv = checkLoginMW({UserModel: fakeUserModel});
        loginFv(req,res,function(err){
            expect(err).to.not.exist;
            expect(res.tpl.error).to.be.not.empty;
            expect(req.session.isLoggedIn).to.not.exist;
            done();
        });
    });

    it('Password no match', function(done){   
        fakeUserModel.findOne = function(query, cb){
            return cb(null, {password:"nothashedpw"});
        }
        loginFv = checkLoginMW({UserModel: fakeUserModel});
        loginFv(req,res,function(err){
            expect(err).to.not.exist;
            expect(res.tpl.error).to.be.not.empty;
            expect(req.session.isLoggedIn).to.not.exist;
            done();
        });
    });
});