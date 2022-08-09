import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import todoSchema from "../models/todoSchema.js";


const addTask = asyncHandler(async (req, res) => {
    //Destruct
    const {task} = req.body;
    try {
        const payload = jwt.verify(req.cookies.token, `${process.env.JWT_KEY}fkheaf`);
        const todo = await new todoSchema({
            task: task,
            user: new mongoose.Types.ObjectId(payload.id),
        }).save();

        res.status(201).json(todo);
    } catch (e) {
        console.log(e)
    }
})

const statusTask = asyncHandler(async (req, res) => {
    //Destruct
    const {id, status} = req.body;
    try {
        const payload = jwt.verify(req.cookies.token, `${process.env.JWT_KEY}fkheaf`);
        const todo = await todoSchema.updateOne({
            user: new mongoose.Types.ObjectId(payload.id),
            _id: new mongoose.Types.ObjectId(id)
        }, {
            status: status
        })
        res.status(201).json(todo);
    } catch (e) {
        console.log(e)
    }
})

const displayTask = asyncHandler(async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, `${process.env.JWT_KEY}fkheaf`);
        const task = await todoSchema.find({user: new mongoose.Types.ObjectId(payload.id)})
        res.status(202).json(task)
    } catch (e) {
        console.log(e)
    }
})


const deleteTask = asyncHandler(async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, `${process.env.JWT_KEY}fkheaf`);
        const todo = await todoSchema.deleteOne({user: new mongoose.Types.ObjectId(payload.id)})
        res.status(200).json(todo)
    } catch (e) {
        console.log(e)
    }
})


export {addTask, displayTask, statusTask, deleteTask}