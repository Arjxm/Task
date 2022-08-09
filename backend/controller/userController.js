import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

import userSchema from "../models/userSchema.js";
import generateToken from "../helper/genToken.js";


const registerUser = asyncHandler(async (req, res) => {

    try {
        //Destruct
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 11);

        const response = await new userSchema({
            name: name,
            email: email,
            password: hashedPassword,
        }).save()

        if (response) {
            res.cookie('token', generateToken(response._id)).status(201).json(response)
        }
    } catch (e) {
        console.log(e)
    }
})


const authUser = asyncHandler(async (req, res) => {
    //Destruct
    const {email, password} = req.body;
    try {
        const userExist = await userSchema.findOne({email});
        if (!userExist) {
            res.status(401).json({message: "not found please sign up"})
        }
        const checkAuth = await bcrypt.compare(password, userExist.password);
        if (checkAuth) {

            res.status(200).cookie('token', generateToken(userExist._id)).json({message: `success ${generateToken(userExist._id)}`})
        } else {
            res.status(400).json({message: "Wrong Password"})
        }
    } catch (e) {
        console.log(e)
    }
})


export {registerUser, authUser}