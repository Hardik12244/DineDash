import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db";
import foodRouter from "./Routes/foodRoute";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

dbConnect();

app.use('/api/food',foodRouter)

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

