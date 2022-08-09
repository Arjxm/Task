import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import {DbCon} from "./helper/dbCon.js";
//Models
import './models/userSchema.js'
import './models/todoSchema.js'


DbCon()

const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors())
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser())

//routes
app.use("/api/user", userRoute)
app.use("/api/task", taskRoute)


app.listen(PORT, () => {
    console.log(`Im ready at ${PORT}`)
})
