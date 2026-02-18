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
    try {
        await food.save()
        res.json({ success: true, msg: "food added" })
    } catch (err) {
        console.log(err);
        res.send(411).json({ success: false, msg: "food not added" })
    }

}

export const listFood = async (req: Request, res: Response) => {

    try {
        const foods = await foodModel.find({})
        res.json({ success: true, msg: "food added" })
    } catch (err) {
        console.log(err);
        res.send(411).json({ success: false, msg: "food not added" })
    }
}

export const removeFood = async (req: Request, res: Response) => {

    try {
        const food = await foodModel.findById(req.body.id)

        if (!food) {
            return res.status(404).json({ success: false, msg: "Food not found" });
        }

        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id)
        
        res.json({ success: true, msg: "food added" })
    } catch (err) {
        console.log(err);
        res.send(411).json({ success: false, msg: "food not added" })
    }

}

