import express from 'express'
import {addTask, deleteTask, displayTask, statusTask} from "../controller/taskController.js";


const router = express.Router()


router.route('/').put(addTask).get(displayTask)
router.route('/update').put(statusTask).delete(deleteTask)


export default router