import { Order } from "../models/order.models.js";
import { User } from '../models/user.models.js'
import razorpay from 'razorpay'

const currency = 'inr';

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


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
        
        const newOrder = await Order.create(orderData)
        await User.findByIdAndUpdate(userId, {cart: {}})

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
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Razorpay',
            payment: false
        }

        const newOrder = await Order.create(orderData)

        const options = {
            amount: amount*100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                return res.json({success: false, message: error.message})
            }
            
            return res.json({success: true, order})
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo);
        
        if(orderInfo.status === 'paid') {
            await Order.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            await User.findByIdAndUpdate(userId, {cart: {}})

            return res.json({success: true, message: "Payment Successfull"})

        } else {
            return res.json({success: false, message: "Payment failed"})
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
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
    try {
        const { status, orderId } = req.body;

        const updatedStatus = await Order.findByIdAndUpdate(
            orderId,
            {status: status}
        )

        return res.status(200).json({
            success: true,
            message: 'Status updated',
            updatedStatus
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    placeOrderCOD,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyRazorpay
}