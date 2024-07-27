import { Request,Response } from "express";
import { IUser } from "../models/User";
import { register } from "../services/UserService";
import { json } from "stream/consumers";

async function handleRegister(req:Request, res:Response){
    const user:IUser = req.body;
    try {
        console.log(`A request to Register ${JSON.stringify(user)}`);
        const registeredUser = await register(user);
        res.status(201).json({
            message:"User successfully created",
            user :{
                _id : registeredUser._id,
                firstName : registeredUser.firstName,
                lastName : registeredUser.lastName,
                email: registeredUser.email
            }
        })
    } catch (error:any) {
        res.status(500).json({message:"Unable to register user at this time",error:error.message});
    }
}

export default {handleRegister};