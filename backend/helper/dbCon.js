import mongoose from "mongoose";


export function DbCon() {

    mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.ubggt1z.mongodb.net/task?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) console.log(err)
            else console.log("connected")
        })


}

