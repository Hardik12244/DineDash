import foodModel from "../models/foodModel"
import fs from 'fs'
import { Request, Response } from "express";


export const addFood = async (req: Request, res: Response) => {
    let image_filename = req.file?.filename;

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename
    })
    try{
        await food.save()
        res.json({success:true,msg:"food added"})
    }catch(err){
        console.log(err);
        res.send(411).json({success:false,msg:"food not added"})
    }

}

