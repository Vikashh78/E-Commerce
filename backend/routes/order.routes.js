import express from 'express'
import { allOrders, placeOrderCOD, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controllers/order.controller.js';
import adminAuth from '../middleware/adminAuth.middleware.js'
import userAuth from '../middleware/userAuth.middleware.js'

const orderRouter = express.Router();

// Payment methods
orderRouter.post('/cod', userAuth, placeOrderCOD)
orderRouter.post('/stripe', userAuth, placeOrderStripe)
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay)

// Admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// User feature
orderRouter.post('/user-orders', userAuth, userOrders)

export default orderRouter;