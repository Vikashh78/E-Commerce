import { v2 as cloudinary } from 'cloudinary'
import { Product } from '../models/product.models.js'


// Endpoint for add product
const addProduct = async (req, res) => {
    /* STEPS:
        1. get product details from req.body
        2. get images from req.file
        3. apply logic for undefined images
        4. upload these images on cloudinary
        5. get the secure URL
        6. create a new db entry for details and images
    */
    try {
        const { name, description, price, category, subCategory, bestSeller, size } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        // console.log(images);
        
        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )
        // console.log(imagesURL);

        const productData = await Product.create({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === 'true'? true : false,
            size,
            date: Date.now(),
            image: imagesURL
        })
        // console.log(productData);
        
        return res
        .status(200)
        .json({
            success: true,
            productData,
            message: "Product added successfully"
        })

        
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({success: false, message: error.message})
    } 
}


// Endpoint for list products
const listProducts = async (req, res) => {
    try {   
        const productList = await Product.find({})
        return res
        .status(200)
        .json({
            success: true,
            productList,
            message: "Product list fatched successfully"
        })

    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({success: false, message: error.message})
    }
}


// Endpoint for remove product
const removeProduct = async (req, res) => {
    try {
        const id = req.body.id
        const product = await Product.findById(id);        

        if(!product) {
            return res
            .status(404)
            .json({success:false, message:"Product not found"})
        }
        await Product.findByIdAndDelete(id);

        return res
        .status(200)
        .json({success:true, message:"Product removed successfully"})
        
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({success: false, message: error.message})
    }
}



// Endpoint for single product
const singleProduct = async (req, res) => {
    try {
        const productId = req.body
        const products = await Product.find({})
        const single = products.filter((item) => item._id !== productId)

        return res
        .status(200)
        .json({
            success: true,
            single,
            message: "Product fatched successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({success: false, message: error.message})
    }
}



export{
    addProduct,
    listProducts,
    removeProduct,
    singleProduct
}