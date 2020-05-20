//model
const User = require("../models/user.model");
//functions
const createAccessToken = require('../jobs/createAccessToken')
//middleware
const asyncMiddleware = require("../middleware/async");

exports.register = asyncMiddleware(async (req, res) => {

    let user = await User.create({ email: 'doctor@gmail.com', password: '123456' }).exec();
    return res.status(200).send({ user });

});

exports.login = asyncMiddleware(async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    //get the user
    const user = await User.findOne({ email: email, password: password }).exec();
    
    //if user doesn't exist throw auth error
    if(!user) throw new Error('AUTH_FAILED');
    
    //create tokens
    const token = await createAccessToken(user);

    return res.status(200).send({ token });
    
});

exports.UpdateProfile = asyncMiddleware(async (req, res) => {

    const rs = await User.findByIdAndUpdate(req.userData.id, req.body);
    return res.status(200).send(rs);
    
});

exports.profile = asyncMiddleware(async (req, res) => {

    const rs = await User.findById(req.userData.id).select("profile about firstname lastname specialist");
    return res.status(200).send(rs);
    
});