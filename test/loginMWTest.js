const assert = require('assert');
const expect = require('chai').expect;

const bcrypt = require('bcrypt');


describe('Login test', function(done){
    it('It should login the user', function(done){
        const mockedPw = "asd";
        var req = { 
            body : {
                mail : "test@gmail.com",
                password : mockedPw,
                remember : "on"
            },
            session : {}
        }; 
        var res = { 
            tpl:{ 
                error : [] 
            },
            storage : {},
            cookie: function(key, obj){
                this.storage[key] = obj;
            }
        };

        var fakeUserModel = {
            findOne : function(query, cb){
                hashPw = bcrypt.hashSync(mockedPw, 10);
                return cb(null, {password:hashPw});
            }
        };
        const checkLoginMW = require('../middleware/user/checkLogin.js');
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
});