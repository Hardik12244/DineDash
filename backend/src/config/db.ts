import mongoose from "mongoose"

export const dbConnect = async () =>{
    await mongoose.connect("mongodb+srv://hardik12244_db_user:ZRBhSAqzPEDnasnW@dinedash.xu1n90f.mongodb.net/")
    .then(()=>console.log("DB connected"))
}