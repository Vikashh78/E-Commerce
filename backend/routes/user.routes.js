import express from 'express'
import { loginUser, registerUser, adminLogin, userDeatils, updatePassword } from "../controllers/user.controllers.js";
import authUser from '../middleware/userAuth.middleware.js'

const userRouter = express.Router()

// User login/register
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// User details
userRouter.post('/profile', authUser, userDeatils)

// User password
userRouter.post('/update-password', authUser, updatePassword)

export default userRouter;