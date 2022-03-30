const passport=require('passport');
const jwt = require('jsonwebtoken');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const users = require("../models/users");
const { append } = require('express/lib/response');
const { nextTick } = require('process');

passport.use(new googleStrategy({

    clientID:"421119988570-5a32o04fej4qk1ut2c2ohjlq8jnoqpsv.apps.googleusercontent.com",

    clientSecret:"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",
    callbackURL:"https://sociade.herokuapp.com/users/auth/google/callback",
},function(accesstoken,refreshtoken,profile,done){
    users.findOne({email:profile.emails[0].value}).exec(async function(err,user){
        try{
            if(user){
            //     let token = await user.generateAuthToken();
            //     console.log(token);
            //     console.log('token saved in cookies and db');
         
            //    return token;
                    return done(null,user);

            }else{
                let user=await users.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                   
                   
                    status:"Active",
                    password:crypto.randomBytes(20).toString('hex')
                });
              
                    // let token = await user.generateAuthToken();
                    // console.log(token);
                    // console.log('token saved in cookies and db');
                    // return token;
                    return done(null,user);
                    
            }

        }catch(err){
            if(err){
                console.log('error in google sign up',err);
                return;
            }
        }
        
    });
}));

module.exports=passport;