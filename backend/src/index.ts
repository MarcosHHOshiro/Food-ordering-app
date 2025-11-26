import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_CONNECTION_STRING || '', {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const app = express();
app.use(express.json())
app.use(cors());

app.get("/test", (req, res) => {
    res.send("Backend is working!");
});

app.listen(7000, () => {
    console.log("Server is running on port 7000");
})