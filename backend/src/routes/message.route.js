import express from "express";

const router = express.Router()
router.get("/msg",(req,res)=>{
    res.send("msg")
})


export default router