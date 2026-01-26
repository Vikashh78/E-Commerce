import { Order } from "../models/order.models.js";


// Placing order via COD
const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        if(!userId) {
            return res.status(401).json({success:false, message:"Unauthorized user"})
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false
        }
        
        await Order.create(orderData)

        return res
        .status(200)
        .json({
            success: true,
            message: "Order placed",
            orderData
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// Placing order via stripe
const placeOrderStripe = async (req, res) => {

}

// Placing order via Razorpay
const placeOrderRazorpay = async (req, res) => {

}

// user all orders for admin panel
const allOrders = async (req, res) => {
    try {
        
        const allOrdersDetails = await Order.find({});
    
        return res
        .status(200)
        .json({
            success:true, 
            message:"All Orders", 
            allOrdersDetails
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.json({success: false, message: "Unauthorized user login again"})
        }
        
        const orders = await Order.find({userId});

        return res
        .status(200)
        .json({
            success: true,
            message: "Order details",
            orders
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// update status from admin panel
const updateStatus = async (req, res) => {

}

export {
    placeOrderCOD,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
}