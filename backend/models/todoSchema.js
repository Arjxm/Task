import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

export default mongoose.model('Task', todoSchema);