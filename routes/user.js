const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
 //Register route
server.post('/register' , (req ,res,next) => {
const { email , password } = req.body;
const user = new User({
    email,
    password
});

//Hash password
bcrypt.genSalt(10, (err , salt) => {
 bcrypt.hash(user.password , salt , async (err , hash) => {
  user.password = hash;
  //Save User
  try{
const newUser = await user.save();
res.send(201);
next();
  } catch(err) {
 return next(new errors.InternalError(err.message));
  }
})
})
}) 

//Auth user
server.post('/auth' , async (req , res,next) => {
 const { email, password } = req.body;
 try{
 const user = await auth.authenticate(email , password);
 
//Create JWT 
const token = jwt.sign(user.toJSON() , config.JWT_SECRET , {
  expiresIn: '15m'
});

const { iat , exp } = jwt.decode(token);
//Respond with token
res.send({iat , exp , token});
next();
 } catch(err) {
 return next(new errors.UnauthorizedError("nai"));
 }
})



}