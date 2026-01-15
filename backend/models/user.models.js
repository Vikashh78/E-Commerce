import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cart: {
        type: Object,
        default: {}
    }

},{timestamps: true}, {minimize: false}) //use to create model in DB also with empty object

export const User = mongoose.models.user || mongoose.model("User", userSchema)