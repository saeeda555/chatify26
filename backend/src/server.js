// const express = require('express')
import express from "express"
const app = express()
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const PORT= ENV.PORT

app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
    connectDB()
})




;


 //"dev": "node --watch server.js"