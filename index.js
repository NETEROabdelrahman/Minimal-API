import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './routes/user.js'
import { postRouter } from './routes/post.js'
import { authRouter } from './routes/auth.js'



const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())


app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/auth', authRouter)






mongoose.connect(process.env.CONNECTION_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
})



const PORT = process.env.PORT || 3008

app.listen(PORT, () => {
    console.log(`running server on port : ${PORT}`)
})