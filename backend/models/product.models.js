import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: Array,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    subCategory: {
        type: String,
        require: true
    },
    bestSeller: {
        type: Boolean
    },
    size: {
        type: String,
        require: true
    },
    date: {
        type: Number,
        require: true
    }

}, {timestamps: true})

export const Product = mongoose.models.product || mongoose.model("Product", productSchema)