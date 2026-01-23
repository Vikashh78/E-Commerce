import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.Mixed, //mixed: to type: mongoose.Schema.Types.Mixed,
        default: {}
    }

},{timestamps: true, minimize: false}) 

export const User = mongoose.models.user || mongoose.model("User", userSchema)
