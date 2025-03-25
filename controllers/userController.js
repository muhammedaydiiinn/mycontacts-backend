const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async  (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please provide all fields');
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error('User already exists');
    }
   
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('hashedPassword' , hashedPassword);
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user){
        res.status(201).json({_id: user._id,email: user.email,});
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.json( {"message": "User Created Succesfuly"}   );
});

// @desc Login a user
// @route POST /api/users/login
// @access Private
const loginUser = asyncHandler(async  (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please provide all fields');
    }
    const user = await User.findOne({ email });
    // compare password with hashed password

    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m'
        });
        res.status(200).json({token});
    }   else{
        res.status(401);
        throw new Error('Invalid credentials');
    }
});


// @desc Current user
// @route GET /api/users/current
// @access Public
const currentUser = asyncHandler(async  (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};