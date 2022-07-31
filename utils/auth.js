const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');

const userlogin = async (userCred ,res) => {
    let {email, password} = userCred;

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message: "USER NOT FOUND",
            success: false
        });
    }

    let passwordmatch = await bcrypt.compare(password, user.password);

    if(passwordmatch){

        let token = jwt.sign({
            _id: user._id, 
            role: user.role,
            email:user.email
        }, SECRET, {expiresIn: "7 days"});

        let authtoken = {
            _id: user._id,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        };
        return res.status(200).json({
            authtoken,
            message: `${user.role} SUCESS`,
            success: true
        });

    }else{
        return res.status(404).json({
            message: "WRONG PASSWORD",
            success: false
        });
    }
}

module.exports = {
    userlogin
}