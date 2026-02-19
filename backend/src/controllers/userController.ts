import userModel from "../models/userModel";
import bcrypt from "bcrypt"
import validator from "validator";
import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import "dotenv/config"

const createToken = async (id: string) => {
    const token = jwt.sign({ id }, process.env.JWTSECRET!)
}

const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const exist = await userModel.find({ email })
        if (exist) {
            return res.json({ success: false, msg: "User already exist" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Invalid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, msg: "Weak password" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id.toString())
        res.json({ success: true, token })

    } catch (error) {
        res.json({ success: false, msg: error })
    }
}

const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            res.json({ success: false, msg:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user!.password)

        if(!isMatch){
            return res.json({success:false,msg:"Invalid credentials"})
        }
        if(!user){return}
        const token = createToken(user._id.toString())
        res.json({success:true,token})
    } catch (error) {
        res.json({success:false,msg:error})
    }

}

export {
    signUp,
    signIn
}