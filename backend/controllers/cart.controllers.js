import { User } from '../models/user.models.js'

// controller for add to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const user = await User.findById(userId)
        if(!user) {
            return res.status(401).json({success: false, message: "Unauthorized user login again"})
        }
        if(!size) {
            return res.status(401).json({success: false, message: "Please select size"})
        }

        let cartData = await user.cart || {};
    
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } 
        else { //if not cart data
            cartData[itemId] = {} //created an obj
            cartData[itemId][size] = 1 //created size for obj
        }

        await User.findByIdAndUpdate(
            userId,
            {cart: cartData}
        )

        return res
        .status(200)
        .json({
            success:true, 
            message:"Added to cart",
            cartData
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// controller for update cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const user = await User.findById(userId)
        if(!user) {
            return res.status(401).json({success: false, message: "Unauthorized user login again"})
        }

        let cartData = await user.cart;

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(
            userId, 
            {cart: cartData}
        );

        return res
        .status(200)
        .json({
            success:true, 
            message:"Cart Updated",
            cartData
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// controller for get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await User.findById(userId)
        
        if(!userData) {
            res.status(401).json({success: false, message: "Unauthorized user login again"})
        }
        
        const cartData = await userData.cart

        return res
        .status(200)
        .json(
            {success:true, 
            message:"Cart Updated",
            cartData
        })      

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}


export {addToCart, updateCart, getUserCart};