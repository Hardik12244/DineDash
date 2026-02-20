import "dotenv/config"

console.log("JWTSECRET:", process.env.JWTSECRET);
import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db";
import foodRouter from "./Routes/foodRoute";
import userRouter from "./Routes/userRoute";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/images",express.static('uploads'))
dbConnect();

app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

