import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";


console.log("CLIENT URL:", ENV.CLIENT_URL);

export const signup = async(req,res)=>{
    const {fullName, email, password, dob} = req.body;

    try {
        if(!fullName || !email || !password || !dob){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length <6 ){
            return res.status(400).json({message:"passwords must be of atleast 6 characters"})
        }

        if(!/[A-Z]/.test(password) || 
           !/[a-z]/.test(password) || 
           !/[0-9]/.test(password)){
            return res.status(400).json({message:"password must contain an uppercase letter, lowercase letter and a number "})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        const birthdate = new Date(dob); 
        if(isNaN(birthdate.getTime())){
            return res.status(400).json({ message: "Please enter a valid dob" });
        }

        const user = await User.findOne({email:email})
        if(user) return res.status(400).json({message:"Email alreaady exists"})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            dob
        })

        if(newUser){
            const savedUser=await newUser.save()
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                dob: newUser.dob
            });

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL)
            } catch (error) {
               console.error("Failed to send welcome Email...")
            }
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller")
        res.status(500).json({message:"Internal server error..."})
    }
}