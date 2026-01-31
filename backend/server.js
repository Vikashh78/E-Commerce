import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './config/mongodb.config.js'
import connectCloudinary from './config/cloudinary.config.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import http from 'http'

/* STEPS: BASIC
    1. import express, cors 
    2. App, port config
    3. middleware setup
    4. API endpoint setup
    5. server listening setup
*/

//.2
const app = express()
const port = process.env.PORT || 4000
const server = http.createServer(app)

connectDB()
connectCloudinary()


//3. middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//4. api endpoits
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/api/status', (req, res) => {
    res.send('API Working')
})


//.5
if(process.env.NODE_ENV !== "production") {
    server.listen(port, () => (
        console.log(`Server is running on PORT ${port}`)
    ))
}

export default server;
