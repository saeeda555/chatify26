// const express = require('express')
import express from "express"
const app = express()
import { ENV } from "./lib/env.js"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
const PORT= ENV.PORT

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))




;


 //"dev": "node --watch server.js"