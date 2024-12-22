import express from "express"
import { connectToDatabase } from "./src/db/db.js";
import { scrapeJobs } from "./src/controllers/scrape.controller.js";
import jobRouter from "./src/routes/Job.route.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()



const app = express();
const PORT = 5000;

connectToDatabase();
app.use(express.json())
app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.get("/scrape", scrapeJobs)
app.use("/jobs",jobRouter)



app.listen(PORT, ()=>{
    console.log(`Server is running on https://localhost:${PORT}`);
    
})