import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controllers';
import authUser from '../middleware/userAuth.middleware';

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)
cartRouter.get('/get', authUser, getUserCart)

export default cartRouter;