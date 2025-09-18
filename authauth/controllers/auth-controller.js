const bcrypt = require("bcryptjs");
const User = require("../models/user-model")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();    
//register of user
const registerUser = async(req,res)=>{
    res.send("Register")
    try{
        //get data from body
        const {username,email,password}=req.body;

        //check if the user exist already
        const checkExistingUser = await User.findOne({email}, {username}, {password});
        if(checkExistingUser){
            return res.status(400).json({
                success: "false",
                message: "User already exists"
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user and save to db
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await newUser.save();
        if (newUser){
            return res.status(201).json({
                success: "true",
                message: "User registered successfully"
            })
        }else{
            return res.status(400).json({
                success: "false",
                message: "Invalid user data"
            })
        }

        //create and assign a token to user
            const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    }catch(error){
        res.status(500).json({
            success: "false",
            message: "Register failed"
        })
        console.log(error)

    }
}


//login of user

const loginUser = async (req,res)=>{
    res.send("Login")
    try{
        //check if the current user exist or not
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({
                success: "false",
                message: "User doesn't eist"
            })
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: "false",
                message: "Invalid Username or Password"
            })
        }
        //create and assign a token to user
        const accessToken = jwt.sign({userId: user._id, username: user.username, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        
        res.status(200).json({
            success: "true",
            message: "User logged in successfully",
            accessToken
        });

    } catch(error){
        res.status(500).json({
            success: "false",
            message: "Login failed"
        })
        console.log(error)
    }}


module.exports={
        registerUser,
        loginUser
    }
